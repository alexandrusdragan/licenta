import Vue from 'vue';
import { LocalStorage, Loading } from 'quasar';
import { firebaseAuth, firebaseDb } from 'boot/firebase';
import { showErrorMessage } from 'src/functions/function-show-error-message';
import { uid } from 'quasar';

let messagesRef;

const state = {
	userDetails: {},
	users: {},
	messages: {},
	dataDownloaded: false,
	loggedIn: false,
	announcements: {
		// ID1: {
		// 	title: 'New office',
		// 	text: 'New office has been built and is now operational.'
		// },
		// ID2: {
		// 	title: 'New office2',
		// 	text: 'New office has been built and is now operational.'
		// },
		// ID3: {
		// 	title: 'New office3',
		// 	text: 'New office has been built and is now operational.'
		// }
	}
};
const mutations = {
	setUserDetails(state, payload) {
		state.userDetails = payload;
	},
	addUser(state, payload) {
		Vue.set(state.users, payload.userId, payload.userDetails);
	},
	updateUser(state, payload) {
		Object.assign(state.users[payload.userId], payload.userDetails);
	},
	addMessage(state, payload) {
		Vue.set(state.messages, payload.messageId, payload.messageDetails);
	},
	clearMessages(state) {
		state.messages = {};
	},
	setDataDownloaded(state, value) {
		state.dataDownloaded = value;
	},
	deleteAnnouncement(state, id) {
		console.log('delete id: ', id);

		Vue.delete(state.announcements, id);
	},
	addAnnouncement(state, payload) {
		Vue.set(state.announcements, payload.id, payload.announcement);
	}
};
const actions = {
	registerUser({}, payload) {
		Loading.show();
		firebaseAuth
			.createUserWithEmailAndPassword(payload.email, payload.password)
			.then((response) => {
				console.log(response);
				let userId = firebaseAuth.currentUser.uid;
				firebaseDb.ref('users/' + userId).set({
					firstName: payload.firstName,
					lastName: payload.lastName,
					email: payload.email,
					department: payload.department,
					online: true
				});
			})
			.catch((error) => {
				showErrorMessage(error.message);
			});
	},
	loginUser({}, payload) {
		Loading.show();
		firebaseAuth
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				showErrorMessage(error.message);
			});
	},
	logoutUser() {
		firebaseAuth.signOut();
	},
	handleAuthStateChanged({ commit, dispatch, state }) {
		firebaseAuth.onAuthStateChanged((user) => {
			Loading.hide();
			if (user) {
				// User is signed in.
				LocalStorage.set('loggedIn', true);
				let userId = firebaseAuth.currentUser.uid;
				firebaseDb.ref('users/' + userId).once('value', (snapshot) => {
					let userDetails = snapshot.val();
					commit('setUserDetails', {
						firstName: userDetails.firstName,
						lastName: userDetails.lastName,
						email: userDetails.email,
						department: userDetails.department,
						userId: userId
					});
				});
				dispatch('firebaseUpdateUser', {
					userId: userId,
					updates: {
						online: true
					}
				});
				dispatch('firebaseGetUsers');
				dispatch('firebaseReadTasks');
				this.$router.push('/').catch((err) => {});
			} else {
				// User is logged out
				LocalStorage.set('loggedIn', false);
				dispatch('firebaseUpdateUser', {
					userId: state.userDetails.userId,
					updates: {
						online: false
					}
				});
				commit('setDataDownloaded', false);
				commit('setUserDetails', {});
				this.$router.replace('/auth').catch((err) => {});
			}
		});
	},
	firebaseUpdateUser({}, payload) {
		if (payload.userId) {
			firebaseDb.ref('users/' + payload.userId).update(payload.updates);
		}
	},
	firebaseGetUsers({ commit }) {
		firebaseDb.ref('users').once('value', (snapshot) => {
			commit('setDataDownloaded', true);
		});

		firebaseDb.ref('users').on('child_added', (snapshot) => {
			let userDetails = snapshot.val();
			let userId = snapshot.key;
			commit('addUser', {
				userId,
				userDetails
			});
		});
		firebaseDb.ref('users').on('child_changed', (snapshot) => {
			let userDetails = snapshot.val();
			let userId = snapshot.key;
			commit('updateUser', {
				userId,
				userDetails
			});
		});
	},
	firebaseGetMessages({ commit, state }, otherUserId) {
		let userId = state.userDetails.userId;
		messagesRef = firebaseDb.ref('chats/' + userId + '/' + otherUserId);
		messagesRef.on('child_added', (snapshot) => {
			let messageDetails = snapshot.val();
			let messageId = snapshot.key;
			commit('addMessage', {
				messageId,
				messageDetails
			});
		});
	},
	firebaseStopGettingMessages({ commit }) {
		if (messagesRef) {
			messagesRef.off('child_added');
			commit('clearMessages');
		}
	},
	firebaseSendMessage({}, payload) {
		firebaseDb.ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId).push(payload.message);

		payload.message.from = 'them';
		firebaseDb.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId).push(payload.message);
	},
	deleteAnnouncement({ dispatch }, id) {
		dispatch('firebaseDeleteAnnouncement', id);
	},
	addAnnouncement({ dispatch }, announcement) {
		let announcementId = uid();
		let payload = {
			id: announcementId,
			announcement: announcement
		};
		dispatch('firebaseAddAnnouncement', payload);
	},
	firebaseReadTasks({ commit }) {
		let userAnnouncements = firebaseDb.ref('announcements');
		userAnnouncements.on('child_added', (snapshot) => {
			let announcement = snapshot.val();
			let payload = {
				id: snapshot.key,
				announcement: announcement
			};
			commit('addAnnouncement', payload);
		});

		userAnnouncements.on('child_removed', (snapshot) => {
			let announcementId = snapshot.key;
			commit('deleteAnnouncement', announcementId);
		});
	},
	firebaseAddAnnouncement({}, payload) {
		let announcementRef = firebaseDb.ref('announcements/' + payload.id);
		announcementRef.set(payload.announcement);
	},
	firebaseDeleteAnnouncement({}, announcementId) {
		let announcementRef = firebaseDb.ref('announcements/' + announcementId);
		announcementRef.remove();
	}
};
const getters = {
	users: (state) => {
		let usersFiltered = {};
		Object.keys(state.users).forEach((key) => {
			if (key !== state.userDetails.userId) {
				usersFiltered[key] = state.users[key];
			}
		});
		return usersFiltered;
	},
	announcements: (state) => {
		return state.announcements;
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
