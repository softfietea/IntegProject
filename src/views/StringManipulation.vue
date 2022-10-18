<template>
  <div class="ma-15 justify-content-center align-content-center">
  <v-card class="" max-width="800" >
    <v-card-title> String Manipulator </v-card-title> 
    <v-text-field label="Enter a String" v-model="stringInput"></v-text-field>
    <v-btn @click="doCountVowel" color="pink" class="text-white ma-5"> Manipulate Word </v-btn>
    <v-card height="30" class="pa-8"> Vowels Count: {{ vowelCount }} </v-card>
    <v-card height="30" class="pa-8"> Consonant Count: {{ consonantCount }} </v-card>
    <v-card height="30" class="pa-8"> Number Count: {{ numberCount }} </v-card>
    <v-card height="30" class="pa-8"> Converted Asterisk: {{ convertedText }} </v-card>
    <v-card height="30" class="pa-8"> Converted Uppercase: {{ convertedCapital }} </v-card>
  </v-card>
</div>
</template>

<script setup>
import { ref } from "vue";

const stringInput = ref("");
const vowelCount = ref(0);
const consonantCount = ref(0);
const numberCount = ref(0);
const convertedText = ref("none");
const convertedCapital = ref("none");

function doCountVowel() {
  vowelCount.value = stringInput.value.match(/[aeiou]/gi).length;
  consonantCount.value = stringInput.value.match(/[^aeiou0-9]/gi).length;
  numberCount.value = stringInput.value.replace(/[^0-9]/g, "").length;
  convertedText.value = stringInput.value.replace(/[aeiou]/gi, "*");
  convertedCapital.value = stringInput.value.replace(
    /[^aeiou]/gi,
    function (v) {
      return v.toUpperCase();
    }
  );
}
</script>
