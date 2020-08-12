import Vue from 'vue';
import { LocalStorage, Loading } from 'quasar';
import { firebaseAuth, firebaseDb } from 'boot/firebase';
import { showErrorMessage } from 'src/functions/function-show-error-message';

let messagesRef;

const state = {
	userDetails: {},
	users: {},
	messages: {},
	dataDownloaded: false,
	loggedIn: false,
	announcements: [
		{
			id: 1,
			title: 'New office',
			text: 'New office has been built and is now operational.'
		},
		{
			id: 2,
			title: 'New office2',
			text: 'New office has been built and is now operational.'
		},
		{
			id: 3,
			title: 'New office3',
			text: 'New office has been built and is now operational.'
		}
	]
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
					name: payload.name,
					email: payload.email,
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
						name: userDetails.name,
						email: userDetails.email,
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
