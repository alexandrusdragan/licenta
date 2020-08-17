<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add post</div>
      <q-space />
      <q-btn v-close-popup flat dense round icon="close" />
    </q-card-section>

    <q-form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <q-input
            outlined
            :rules="[val => !!val || 'Field is required']"
            v-model="taskToSubmit.title"
            label="Title"
            ref="name"
            autofocus
            clearable
          />
        </div>
        <div class="row q-mb-sm">
          <q-input outlined v-model="taskToSubmit.text" label="Content" class="col" clearable />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn type="submit" flat label="Publish" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      taskToSubmit: {
        title: "",
        text: "",
      },
    };
  },
  methods: {
    ...mapActions("store", ["addAnnouncement"]),
    submitForm() {
      this.$refs.name.validate();
      if (!this.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.addAnnouncement(this.taskToSubmit);
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>