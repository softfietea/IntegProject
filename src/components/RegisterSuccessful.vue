<template>
  <v-app>
    <v-col align="center">
      <v-container class="">
        <v-img class="w-25" src="../src/assets/thankyou.svg"></v-img>
      </v-container>
      <h1 class="headline">Thank you for Registering your account</h1>
      <h2 class="caption" style="font-weight: 400">
        you can now navigate to different alfie's activity
      </h2>
      <h4 class="caption" style="font-weight: 400">
        you can start by clicking the button to bring you to the Personal
        Activity.
      </h4>
      <v-btn
        color="indigo"
        class="mt-5"
        @click="this.$router.push('PersonalLife')"
        >Click here</v-btn
      >
    </v-col>
  </v-app>
</template>

<script setup></script>
