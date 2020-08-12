<template>
  <q-list bordered separator>
    <q-item v-for="announcement in announcements" :key="announcement.id" clickable v-ripple>
      <q-item-section>
        <q-item-label>{{announcement.title}}</q-item-label>
        <q-item-label caption>{{announcement.text}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: ["tab"],
  computed: {
    announcements() {
      return this.$store.getters["store/announcements"];
    },
  },
};
</script>

<style>
</style>