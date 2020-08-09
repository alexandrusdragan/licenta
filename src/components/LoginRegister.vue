<template>
  <q-form @submit.prevent="submitForm" novalidate>
    <transition
      appear
      enter-active-class="animated backInUp"
      leave-active-class="animated backOutDown"
    >
      <q-input
        v-if="tab=='register'"
        outlined
        v-model="formData.name"
        :rules="[
          val => !!val || '* Please enter your name.',
        ]"
        lazy-rules
        class="q-mb-md"
        label="Name"
      />
    </transition>
    <transition
      appear
      enter-active-class="animated backInUp"
      leave-active-class="animated backOutDown"
    >
      <q-input
        outlined
        v-model="formData.email"
        :rules="[
          val => isValidEmailAddress(val) || 'Please enter a valid email address.',
        ]"
        lazy-rules
        class="q-mb-md"
        type="email"
        label="Email"
      />
    </transition>
    <transition
      appear
      enter-active-class="animated backInUp"
      leave-active-class="animated backOutDown"
    >
      <q-input
        outlined
        v-model="formData.password"
        :rules="[
          val => !!val || '* Required',
          val => val.length >= 6 || 'Please use at least 6 characters.',
        ]"
        lazy-rules
        class="q-mb-md"
        type="password"
        label="Password"
      />
    </transition>
    <transition
      appear
      enter-active-class="animated backInUp"
      leave-active-class="animated backOutDown"
    >
      <div class="row">
        <q-space />
        <q-btn color="primary" type="submit" :label="tab" />
      </div>
    </transition>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("store", ["registerUser", "loginUser"]),
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.formData);
      } else {
        this.registerUser(this.formData);
      }
    },
  },
};
</script>

<style>
</style>