<template>


        <h1>List of Movies</h1>


          <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg1 v-for="movie in movieObject.data" key="movie.title">
          <v-card
         class="mx-auto ma-3"
         max-width="344"
         outlined
       >
         <v-list-item three-line>
           <v-list-item-content>
             <div class="text-overline mb-4">
               {{movie.title}}
             </div>
             <v-list-item-title class="text-h5 mb-1">
               {{movie.genre}}
             </v-list-item-title>
             <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
           </v-list-item-content>
     
           <v-list-item-avatar
             tile
             size="80"
             color="grey"
           ></v-list-item-avatar>
         </v-list-item>
     
         <v-card-actions>
           <v-btn
             outlined
             rounded
             text
           >
             Button
           </v-btn>
         </v-card-actions>
       </v-card>
      </v-flex>
          </v-layout>

          <button @click="nextPage">next</button>
          <button @click="prevPage">prev</button>

</template>

<script setup>






import axios from 'axios';
import {ref, onMounted} from 'vue';

const movieObject = ref([]);
var stringifyJSON = ref("");
const listStart = ref(0);
const listEnd = ref(6);



function getMovieApi(){
  axios.get('https://movies115.p.rapidapi.com/cartaz', options).then(
        (value)=>{
            stringifyJSON = JSON.stringify(value);
            movieObject.value = JSON.parse(stringifyJSON);
            console.log(movieObject.value);
            
        }
    );

}

function nextPage(){
  listStart.value = listStart.value + 5;
  listEnd.value = listEnd.value + 5;
}

function prevPage(){
  listStart.value = listStart.value - 5;
  listEnd.value = listEnd.value - 5;
}


const options = {
  method: 'GET',
  url: 'https://movies115.p.rapidapi.com/cartaz',
  headers: {
    'X-RapidAPI-Key': '442a343cfdmshbbd178fcc294d51p1fdfe4jsn9d14b2c48def',
    'X-RapidAPI-Host': 'movies115.p.rapidapi.com'
  }
};

onMounted(() => {
  getMovieApi();

})
</script>