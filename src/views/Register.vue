<template>

<v-container fluid>
<v-row align="center" justify="center">

  <v-col align="center" justify="center" >
    
    <h1 align="start" class="ml-16">Register</h1>
  <v-container width="30%" height="300" class="ml-13" >
   
    <v-text-field
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
      <v-text-field
      
        color="white"
        label="Confirm Password"
        v-model="passConfirm"
        hide-details="auto"
      ></v-text-field>  
      <br>
      <v-snackbar
        v-model="snackbarState"
        :timeout="3000"
      >
        {{errorText}}
     
      </v-snackbar>

      <v-btn  width="470"
    outlined
    color="green"
    class="ma-2 text-white" @click="signUp"> Create Account</v-btn>

    <v-btn  width="470"
    outlined
    color="indigo"
    class="ma-2 text-white" @click="this.$router.push('login')"> Go back</v-btn>

    


  </v-container>
</v-col>

<v-container class="ma-16 mr-n1" align="center" justify="center">
  <v-img
  width="800"
     src="../src/assets/register.svg"

    ></v-img>
</v-container>






   
</v-row>
   <v-row justify="center" align="end" class="mt-16" fluid> <h6>All Rights Reserved 2022</h6> </v-row>
  
  
  </v-container>
  



    
    
    </template>
    
    
    <script setup>
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    const auth = getAuth();
    const email = ref('');
    const pass = ref('');
    const userEmail = ref('')
    const passConfirm = ref('');
    const errorText =ref('');
    const snackbarState = ref(false);
    const router = useRouter()

    
    function test(){
      console.log("Signed In user: " + userEmail.value);
    }
    
    
      function signUp(){
    
if(pass.value == passConfirm.value){
  createUserWithEmailAndPassword(auth,email.value, pass.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        userEmail.value = user;
        console.log("Signed In user: " + user.email);
        // ...
        router.push({
        name: 'RegisterSuccessful',
      })
      })
      .catch((error) => {
        snackbarState.value = true;
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Errorcode:" +errorCode + " " + "Error Message: " + errorMessage);
        
        if(error.code == 'auth/invalid-email'){
  errorText.value = 'You put invalid email. Please input a correct email'
}
if(error.code == 'auth/weak-password'){
  errorText.value = 'Password should be at least 6 characters'
}
if(error.code == 'auth/email-already-in-use'){
  errorText.value = 'This email is already created, you can sign in this email in the login screen'
}
if(error.code == 'auth/too-many-requests'){
  errorText.value = 'Too many register attempts, Try again later.'
}
        // ...
      });

}else{
  snackbarState.value = true;
  errorText.value = 'Please make sure that your password is the same with confirm password.'
}
    
    }
    
    
    
    
    </script>
    