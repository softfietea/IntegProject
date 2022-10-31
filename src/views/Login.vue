
<template>
  <v-container fluid>
<v-row align="center" justify="center">

  <v-col align="center" justify="center" >
    
    <h1 align="start" class="ml-16">Login</h1>
  <v-container width="30%" height="300" class="ml-13" >
   
      <v-text-field
      v-bind:error-messages= errorText
    v-bind:error= haveError
      color="white"
      label="Email"
      v-model="email"
      hide-details="auto"
    ></v-text-field>  
    <br>
    <v-text-field

      color="white"
      label="Password"
      v-model="pass"
      hide-details="auto"
    ></v-text-field>  
    <br>
    <v-btn
    width="470"
    outlined
    color="indigo"
    class="ma-2"
     @click = "signIn(email,pass)"> Login</v-btn>
    <br>
    <v-btn
    width="470"
    outlined
    color="thirdy"
    class="ma-2"
    @click = "this.$router.push('Register')">Create an Account</v-btn>


  </v-container>
</v-col>

<v-container class="ma-16 mr-n1" align="center" justify="center">
  <v-img
  width="900"
     src="../src/assets/onlinetest.svg"

    ></v-img>
</v-container>






   
</v-row>
   <v-row justify="center" class="mt-16"> <h6>All Rights Reserved 2022</h6> </v-row>
  
  
  </v-container>
  
  </template>
  
  
  <script setup>
  import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
  import { useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue';



  
  const auth = getAuth();
  const email = ref('');
  const pass = ref('');
  const user = ref();
  const router = useRouter()
  const route = useRoute()
  const errorText = ref('');
  const haveError = ref(false);

  function test(){
      console.log("Signed In user: " + getAuth().currentUser.email);
    }

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