
<template>
  <v-container grid-list-xl>
      <v-text-field
      color="white"
      label="Email"
      v-model="email"
      hide-details="auto"
    ></v-text-field>  
    <v-text-field
      color="white"
      label="Password"
      v-model="pass"
      hide-details="auto"
    ></v-text-field>  
    <h3 class="text-red">{{errorText}}</h3>
    <button @click = "signIn(email,pass)"> Login</button>
    <br>
    <button @click = "this.$router.push('Register')">Create an Account</button>
  
  
  </v-container>
  
  </template>
  
  
  <script setup>
  import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
  import { useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue';
  import { FirebaseError } from '@firebase/util';


  
  const auth = getAuth();
  const email = ref('');
  const pass = ref('');
  const user = ref();
  const router = useRouter()
  const route = useRoute()
  const errorText = ref('');

 function signIn(email,pass){

 signInWithEmailAndPassword(auth, email, pass ).then((UserCredential)=>{

   user.value = UserCredential;
   router.push({
        name: 'PersonalLife',
        query: {
          ...route.query,
        },
      })

}).catch(error=>{
  console.log(error);
if(error.code == 'auth/invalid-email'){
  errorText.value = 'You put invalid email.'
}
if(error.code == 'auth/wrong-password'){
  errorText.value = 'You input wrong password, Please Try again.'
}
if(error.code == 'auth/internal-error'){
  errorText.value = 'We cannot manage to process your information, make sure you input right credentials.'
}
if(error.code == 'auth/too-many-requests'){
  errorText.value = 'Too many login attempts, Your account has been disabled temporarily. Try again later.'
}

});


}
  
  
  
  
  </script>