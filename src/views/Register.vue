<template>
    <v-container grid-list-xs>
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
      <v-text-field
      
        color="white"
        label="Confirm Password"
        v-model="passConfirm"
        hide-details="auto"
      ></v-text-field>  
      <v-snackbar
        v-model="snackbarState"
        :timeout="3000"
      >
        {{errorText}}
     
      </v-snackbar>

      <button @click="signUp"> Create Account</button>
      <br>
      <button @click="test"> test </button>
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
    