<template>
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