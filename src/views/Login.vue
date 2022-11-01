<template>
  <v-main>
    <v-row align="center" class="mt-16">
      <v-container class="h-25 w-50">
        <v-container class="ma-16 w-75">
          <h1 align="start" style="font-size: 50px">Login</h1>
          <p
            align="start"
            class="mb-5"
            style="font-size: 15px; font-weight: lighter"
          >
            Welcome to Alfie's Website before you access the page you need to
            sign in first.
          </p>
          <v-text-field
            v-bind:error-messages="errorText"
            v-bind:error="haveError"
            color="white"
            label="Email"
            v-model="email"
            hide-details="auto"
          ></v-text-field>
          <br />
          <v-text-field
            type="password"
            color="white"
            label="Password"
            v-model="pass"
            hide-details="auto"
          ></v-text-field>
          <br />
          <v-btn
            outlined
            color="indigo"
            class="w-100"
            @click="signIn(email, pass)"
          >
            Login</v-btn
          >
          <br />
          <v-btn
            outlined
            color="thirdy"
            class="mt-5 w-100"
            @click="this.$router.push('Register')"
            >Create an Account</v-btn
          >
        </v-container>
      </v-container>

      <v-container class="h-25 w-50">
        <v-img
          :src="require('../src/assets/onlinetest.svg')"
          class="ma-16"
        ></v-img>
      </v-container>
    </v-row>
  </v-main>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

const auth = getAuth();
const email = ref("");
const pass = ref("");
const user = ref();
const router = useRouter();
const route = useRoute();
const errorText = ref("");
const haveError = ref(false);

function test() {
  console.log("Signed In user: " + getAuth().currentUser.email);
}

function signIn(email, pass) {
  signInWithEmailAndPassword(auth, email, pass)
    .then((UserCredential) => {
      user.value = UserCredential;
      router.push({
        name: "PersonalLife",
        query: {
          ...route.query,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.code == "auth/invalid-email") {
        errorText.value = "You put invalid email.";
      }
      if (error.code == "auth/wrong-password") {
        errorText.value = "You input wrong password, Please Try again.";
      }
      if (error.code == "auth/internal-error") {
        errorText.value =
          "We cannot manage to process your information, make sure you input right credentials.";
      }
      if (error.code == "auth/too-many-requests") {
        errorText.value =
          "Too many login attempts, Your account has been disabled temporarily. Try again later.";
      }
    });
}
</script>
