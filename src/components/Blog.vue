<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <q-card class="full-width">
      <q-list v-if="tab=='blog'" bordered separator>
        <announcement
          v-for="(announcement,key) in announcements"
          :key="key"
          :announcement="announcement"
          :id="key"
        ></announcement>
      </q-list>
    </q-card>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  props: ["tab"],
  computed: {
    ...mapGetters("store", ["announcements"]),
  },
  components: {
    announcement: require("components/Announcements.vue").default,
  },
};
</script>

<style>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>