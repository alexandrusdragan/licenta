<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <q-list v-if="tab=='chat'" class="full-width" separator>
      <template v-if="dataDownloaded">
        <q-item v-for="(user,key) in users" :key="key" :to="'/chat/'+key" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">{{ user.name.charAt(0) }}</q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-badge
              :color="user.online ? 'light-green-5' : 'grey-4'"
            >{{user.online ? 'Online' : 'Offline'}}</q-badge>
          </q-item-section>
        </q-item>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner-dots color="primary" size="2em" />
        </span>
      </template>
    </q-list>
  </transition>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: ["tab"],
  computed: {
    ...mapGetters("store", ["users"]),
    ...mapState("store", ["dataDownloaded"]),
  },
};
</script>

<style>
</style>

