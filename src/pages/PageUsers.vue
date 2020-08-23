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

.q-page {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%2314213d' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
