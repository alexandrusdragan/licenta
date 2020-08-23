<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          icon="arrow_back"
          flat
          dense
          label="Back"
        />
        <q-toolbar-title class="absolute-center">{{title}}</q-toolbar-title>
        <q-btn
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login"
        />
        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
        >
          Logout
          <br />
          {{userDetails.firstName}}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details.js";

const linksData = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default {
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState("store", ["userDetails"]),
    title() {
      console.log(this.$route);
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "TeamChat";
      else if (currentPath.includes("/chat"))
        return (
          this.otherUserDetails.firstName + " " + this.otherUserDetails.lastName
        );
      else if (currentPath == "/auth") return "Login";
    },
  },
  methods: {
    ...mapActions("store", ["logoutUser"]),
  },
  components: { EssentialLink },
};
</script>

<style lang="stylus">
.q-toolbar {
  .q-btn {
    line-height: 1.2;
  }
}
</style>
