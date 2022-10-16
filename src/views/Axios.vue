<template>
    <h1>List of Grocery</h1>
    <v-container grid-list-xs>
        <v-card v-for="grocery in groceryObject.data" key="grocery.grocery_id" class="px-15" width="200" height="200">
            {{grocery.name}}
            {{grocery.brand}}
            {{grocery.origin}}
            {{grocery.quantity}}
            {{grocery.size}}
        </v-card>
    </v-container>

</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';

const groceryObject = ref([]);
var stringifyJSON = ref("");

function getGroceryApi(){
  axios.get('https://groceries2.p.rapidapi.com/api/v1/groceries', options).then(
        (value)=>{
            stringifyJSON = JSON.stringify(value);
            groceryObject.value = JSON.parse(stringifyJSON);
        }
    );

}


const options = {
  method: 'GET',
  url: 'https://groceries2.p.rapidapi.com/api/v1/groceries',
  headers: {
    'X-RapidAPI-Key': '442a343cfdmshbbd178fcc294d51p1fdfe4jsn9d14b2c48def',
    'X-RapidAPI-Host': 'groceries2.p.rapidapi.com'
  }
};

onMounted(() => {
   getGroceryApi()
})
</script>