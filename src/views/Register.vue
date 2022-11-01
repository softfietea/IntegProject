<template>
  <v-app>
    <v-row align="center">
      <v-container class="w-50">
        <v-container class="ma-16">
          <v-col align="start" justify="start">
            <v-container>
              <h1 align="start" style="font-size: 50px">Create Account</h1>
              <h1
                align="start"
                style="font-size: 15px; font-weight: lighter"
                class="mb-5"
              >
                This section is all about making an account to access to this
                website, in order to create this you need an email address and a
                password. make sure that the password and confirm password is
                the same
              </h1>
              <v-text-field
                class="w-100"
                color="white"
                label="Email"
                v-model="email"
                hide-details="auto"
              ></v-text-field>
              <br />
              <v-text-field
                :append-inner-icon="
                  isVisiblePrimary ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="isVisiblePrimary = !isVisiblePrimary"
                color="white"
                :type="isVisiblePrimary ? 'text' : 'password'"
                label="Password"
                v-model="pass"
                hide-details="auto"
              ></v-text-field>
              <br />
              <v-text-field
                :append-inner-icon="
                  isVisibleSecondary ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="isVisibleSecondary = !isVisibleSecondary"
                color="white"
                :type="isVisibleSecondary ? 'text' : 'password'"
                label="Confirm Password"
                v-model="passConfirm"
                hide-details="auto"
              ></v-text-field>
              <br />
              <v-snackbar
                color="thirdy"
                v-model="snackbarState"
                :timeout="3000"
              >
                {{ errorText }}
              </v-snackbar>

              <v-btn
                outlined
                color="green"
                class="text-white w-100"
                @click="signUp"
              >
                Create Account</v-btn
              >

              <v-btn
                width="470"
                outlined
                color="indigo"
                class="mt-5 text-white w-100"
                @click="this.$router.push('login')"
              >
                Go back</v-btn
              >
            </v-container>
          </v-col>
        </v-container>
      </v-container>

      <v-container class="w-50 pl-16">
        <v-img
          class="ma-16"
          justify="center"
          width="500"
          src="../src/assets/register.svg"
        ></v-img>
      </v-container>
    </v-row>
  </v-app>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const auth = getAuth();
const email = ref("");
const pass = ref("");
const userEmail = ref("");
const passConfirm = ref("");
const errorText = ref("");
const snackbarState = ref(false);
const router = useRouter();
const isVisiblePrimary = ref(false);
const isVisibleSecondary = ref(false);

function test() {
  console.log("Signed In user: " + userEmail.value);
}

function signUp() {
  if (pass.value == passConfirm.value) {
    createUserWithEmailAndPassword(auth, email.value, pass.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        userEmail.value = user;
        console.log("Signed In user: " + user.email);
        // ...
        router.push({
          name: "RegisterSuccessful",
        });
      })
      .catch((error) => {
        snackbarState.value = true;
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          "Errorcode:" + errorCode + " " + "Error Message: " + errorMessage
        );

        if (error.code == "auth/invalid-email") {
          errorText.value =
            "You put invalid email. Please input a correct email";
        } else if (error.code == "auth/internal-error") {
          errorText.value = "Make sure your credentials are complete and valid";
        } else if (error.code == "auth/weak-password") {
          errorText.value = "Password should be at least 6 characters";
        } else if (error.code == "auth/email-already-in-use") {
          errorText.value =
            "This email is already created, you can sign in this email in the login screen";
        } else if (error.code == "auth/too-many-requests") {
          errorText.value = "Too many register attempts, Try again later.";
        } else {
          errorText.value =
            "Something went wrong, check your connection and try again.";
        }
        // ...
      });
  } else {
    snackbarState.value = true;
    errorText.value =
      "Please make sure that your password is the same with confirm password.";
  }
}
</script>
