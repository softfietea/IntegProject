<template>
  <v-app>
    <v-main>
      <Navbar v-if="isLoggedIn"/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from "@/components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { ref, onMounted } from "vue";

const isLoggedIn = ref(false);

const auth = getAuth();


onMounted(()=>{

onAuthStateChanged(auth,(user)=>{
  if(user){
    isLoggedIn.value = true;
  }else{
    isLoggedIn.value = false;
  }
})


});
</script>
