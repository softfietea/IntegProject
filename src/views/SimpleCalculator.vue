<template>
  <v-container fluid>
    <v-text-field label="First Input" v-model.number="fNumber"></v-text-field>
    <v-text-field label="Second Input" v-model.number="sNumber"></v-text-field>

    <v-btn @click="doSum" color="primary">Results</v-btn>

    <v-row align="center" justify="space-between" class="mx-10 mt-15">
      <v-card height="120" width="150" title="Sum:">
        <v-col align="center" justify="center">
          <p class="font-weight-light text-h4">
            {{ sum }}
          </p>
        </v-col>
      </v-card>
      <v-card height="120" width="150" title="Difference:">
        <v-col align="center" justify="center">
          <p class="font-weight-light text-h4">
            {{ difference }}
          </p>
        </v-col>
      </v-card>
      <v-card height="120" width="150" title="Product:">
        <v-col align="center" justify="center">
          <p class="font-weight-light text-h4">
            {{ product }}
          </p>
        </v-col>
      </v-card>
      <v-card height="120" width="150" title="Quotient:">
        <v-col align="center" justify="center">
          <p class="font-weight-light text-h4">
            {{ quotient }}
          </p>
        </v-col>
      </v-card>

      <v-card height="120" width="150" title="Average:">
        <v-col align="center" justify="center">
          <p class="font-weight-light text-h4">
            {{ average }}
          </p>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const fNumber = ref(0);
const sNumber = ref(0);
const sum = ref(0);
const difference = ref(0);
const product = ref(0);
const quotient = ref(0);
const average = ref(0);

function doSum() {
  sum.value = fNumber.value + sNumber.value;
  difference.value = fNumber.value - sNumber.value;
  product.value = fNumber.value * sNumber.value;
  quotient.value = fNumber.value / sNumber.value;
  average.value = fNumber.value + sNumber.value / 2;
}
</script>
