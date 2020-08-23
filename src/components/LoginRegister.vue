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
        v-model="formData.firstName"
        :rules="[
          val => !!val || '* Please enter your name.',
        ]"
        lazy-rules
        class="q-mb-md"
        label="First name"
      />
    </transition>
    <transition
      appear
      enter-active-class="animated backInUp"
      leave-active-class="animated backOutDown"
    >
      <q-input
        v-if="tab=='register'"
        outlined
        v-model="formData.lastName"
        :rules="[
          val => !!val || '* Please enter your name.',
        ]"
        lazy-rules
        class="q-mb-md"
        label="Last name"
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
      <q-btn-dropdown label="Department" v-if="tab=='register'" class="q-mb-xl">
        <q-list>
          <q-item
            clickable
            v-model="formData.department"
            v-close-popup
            @click="onItemClick('Production')"
          >
            <q-item-section>
              <q-item-label>Production</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-model="formData.department"
            v-close-popup
            @click="onItemClick('Human Resources')"
          >
            <q-item-section>
              <q-item-label>Human Resources</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-model="formData.department"
            v-close-popup
            @click="onItemClick('Marketing')"
          >
            <q-item-section>
              <q-item-label>Marketing</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-model="formData.department"
            v-close-popup
            @click="onItemClick('Research&Development')"
          >
            <q-item-section>
              <q-item-label>Research&Development</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        department: "",
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
    onItemClick(item) {
      this.formData.department = item;
      console.log("department: ", this.formData.department);
    },
  },
};
</script>

<style>
.q-btn-dropdown {
  background-color: #ef9a0d;
}
</style>