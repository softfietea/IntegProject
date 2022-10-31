<template>


<App v-if="isLoggedIn">

</App>

<Login v-if="!isLoggedIn">
        
</Login>


</template>



<script setup>
import { getAuth } from '@firebase/auth';
import { ref } from 'vue'
import App from '../App.vue';
import Login from "../views/Login.vue"

const isLoggedIn = ref(getAuth().currentUser != null);





</script>