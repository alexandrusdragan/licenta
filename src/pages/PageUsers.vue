<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="chat" label="Chat" />
        <q-tab name="blog" label="Blog" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="chat">
          <users-chat :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="blog">
          <users-blog :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div v-if="tab=='blog'" class="absolute-bottom text-center q-mb-lg">
      <q-btn @click="showAddAnnouncement=true" round color="primary" size="20px" icon="add" />
    </div>

    <q-dialog v-model="showAddAnnouncement">
      <add-ann></add-ann>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "chat",
      showAddAnnouncement: false,
    };
  },
  components: {
    "users-chat": require("components/Users.vue").default,
    "users-blog": require("components/Blog.vue").default,
    "add-ann": require("components/AddAnnouncement.vue").default,
  },
};
</script>

<style></style>
