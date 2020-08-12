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
  data() {
    return {
      announcements: [
        {
          id: 1,
          title: "New office",
          text: "New office has been built and is now operational.",
        },
        {
          id: 2,
          title: "New office2",
          text: "New office has been built and is now operational.",
        },
        {
          id: 3,
          title: "New office3",
          text: "New office has been built and is now operational.",
        },
      ],
    };
  },
};
</script>

<style>
</style>