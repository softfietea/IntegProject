<template>
  <v-app>
    <v-main>
      <Navbar v-if="auth.currentUser != null" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from "@/components/NavBar.vue";
import { getAuth } from "@firebase/auth";
import { ref } from "vue";

const auth = ref(getAuth());


</script>
