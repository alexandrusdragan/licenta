<template>
  <q-list bordered separator>
    <announcement
      v-for="(announcement,key) in announcements"
      :key="key"
      :announcement="announcement"
      :id="key"
    ></announcement>
  </q-list>
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
</style>