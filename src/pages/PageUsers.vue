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
          <!-- <div class="q-pa-md absolute full-width full-height column">
          <q-scroll-area class="q-scroll-area-tasks">-->
          <users-blog :tab="tab" />
          <!-- </q-scroll-area>
          </div>-->
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div
      v-if="tab=='blog'&&userDetails.userId=='2ZSy2Dkt7fZGkp53LTlgMWub9zx1'"
      class="absolute-bottom text-center q-mb-lg no-pointer-events"
    >
      <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <q-btn
          @click="showAddAnnouncement=true"
          class="all-pointer-events"
          round
          color="primary"
          size="20px"
          icon="add"
        />
      </transition>
    </div>

    <q-dialog v-model="showAddAnnouncement">
      <add-ann @close="showAddAnnouncement=false"></add-ann>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
  computed: {
    ...mapGetters("store", ["users"]),
    ...mapState("store", ["userDetails"]),
  },
};
</script>

<style>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
