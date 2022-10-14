<template>
  <v-container fluid class="bg-background h-100">
    <div class="mx-15">
      <h1>Area Activity</h1>
      <div class="red">
        <p>
          Please Select Shapes you wished to calculate the Area by input the
          number from 1 - 4, here are the options:
        </p>
      </div>
      <div>
        <p>1. Rectangle 2. Square 3. Triangle 4. Circle</p>
      </div>
      <div class="mt-5">
        <v-text-field
          label="Choose what shape you wanted to calculate the Area"
          v-model="wantedShape"
        ></v-text-field>
      </div>
      <v-btn @click="submitChosenShape" color="primary">Submit</v-btn>
      <p
        v-if="
          chosenShape != 1 &&
          chosenShape != 2 &&
          chosenShape != 3 &&
          chosenShape != 4
        "
        class="mt-5"
      >
        Please select a valid input of shape first. (1 - 4) is the valid input.
      </p>

      <!--
        Rectangle Rendering Part
    -->

      <div v-if="chosenShape == 1" class="mt-5">
        <v-text-field label="input width" v-model="input1"></v-text-field>
        <v-text-field label="input length" v-model="input2"></v-text-field>

        <v-btn @click="computeRectangle" color="primary"
          >Compute Area of Rectangle</v-btn
        >
        <v-card class="pa-5 mt-10">Result: {{ areaOfRectangle }}</v-card>
      </div>

      <!-- 
            Square Rendering Part
            -->

      <div v-if="chosenShape == 2" class="mt-5">
        <v-text-field label="input Side" v-model="input1"></v-text-field>

        <v-btn @click="computeSquare" color="primary"
          >Compute Area of Square</v-btn
        >
        <v-card class="pa-5 mt-10">Result: {{ areaOfSquare }}</v-card>
      </div>
      <!--
        Triangle Rendering Part
        -->
      <div v-if="chosenShape == 3" class="mt-5">
        <v-text-field label="input base" v-model="input1"></v-text-field>
        <v-text-field label="input height" v-model="input2"></v-text-field>

        <v-btn @click="computeTriangle" color="primary"
          >Compute Area of Triangle</v-btn
        >

        <v-card class="pa-5 mt-10">Result: {{ areaOfTriangle }}</v-card>
      </div>

      <!--
        Circle Rendering Part
        -->

      <div v-if="chosenShape == 4" class="mt-5">
        <v-text-field label="input radius" v-model="input1"></v-text-field>

        <v-btn @click="computeCircle" color="primary"
          >Compute Area of Circle</v-btn
        >

        <v-card class="pa-5 mt-10">Result: {{ areaOfCircle }}</v-card>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

//pi value
const piValue = ref(3.141592653589793238462643383279502884197);

//Input Chosen Shape
const chosenShape = ref(0);
const wantedShape = ref(0);

//result of Area Shapes
const areaOfRectangle = ref(0);
const areaOfSquare = ref(0);
const areaOfTriangle = ref(0);
const areaOfCircle = ref(0);

//Input Needed in specific Shape
const input1 = ref(0);
const input2 = ref(0);

function submitChosenShape() {
  chosenShape.value = wantedShape.value;
}

function computeRectangle() {
  //length * Width

  areaOfRectangle.value = input1.value * input2.value;
}

function computeSquare() {
  //Side * Side or Side^2
  areaOfSquare.value = input1.value * input1.value;
}

function computeTriangle() {
  // 1/2 * base * height

  areaOfTriangle.value = (1 / 2) * input1.value * input2.value;
}

function computeCircle() {
  // pi * Radius^2
  areaOfCircle.value = piValue.value * input1.value * input1.value;
}
</script>
