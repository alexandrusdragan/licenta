<template>
  <!-- <div class="q-pa-md absolute full-width full-height column">
  <q-scroll-area class="q-scroll-area-tasks">-->
  <q-item clickable v-ripple>
    <q-item-section>
      <q-item-label>{{announcement.title}}</q-item-label>
      <q-item-label v-html="editor" caption>{{announcement.text}}</q-item-label>
    </q-item-section>
    <q-item-section v-if="userDetails.userId=='2ZSy2Dkt7fZGkp53LTlgMWub9zx1'" side>
      <q-btn @click.stop="confirm=true" flat round dense color="red" icon="delete" />
    </q-item-section>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you wish to delete this post?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn @click="deleteFunction(id)" flat label="Delete" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-item>
  <!-- </q-scroll-area>
  </div>-->
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  props: ["announcement", "id"],
  data() {
    return {
      confirm: false,
      editor: this.announcement.text,
    };
  },
  methods: {
    ...mapActions("store", ["deleteAnnouncement"]),
    deleteFunction(id) {
      this.deleteAnnouncement(id);
    },
  },
  computed: {
    ...mapGetters("store", ["users"]),
    ...mapState("store", ["userDetails"]),
  },
};
</script>

<style>
</style>