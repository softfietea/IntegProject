<template>

<v-container grid-list-lg  >
  

        <h1>List of Movies</h1>

          <v-row  rows="4" class="mt-4" >
          <v-flex xs12 sm6 md4 lg1 v-for="movie in movieObject.data" key="movie.title" >
    
          <v-card
         class="mx-10 ma-3"
         width="300"
         max-height="400"
         outlined
       >
         <v-list-item three-line>
           <v-list-item-content>
             <div class="text-overline mb-4">
               {{movie.genre}}
             </div>
             <v-list-item-title class="text-h5 mb-1">
               {{movie.title}}
             </v-list-item-title>
             <v-list-item-subtitle>Movie Score: {{movie.score}} </v-list-item-subtitle>
        
             <v-list-item-subtitle class="mt-2">by {{movie.source}} </v-list-item-subtitle>
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
             text="Visit"
             color="red"
             v-bind:href="movie.url"
           >
             
           </v-btn>
         </v-card-actions>
       </v-card>
      </v-flex>
          </v-row>


        </v-container>
</template>



<script setup>

import axios from 'axios';
import {ref, onMounted} from 'vue';

const movieObject = ref([]);
var stringifyJSON = ref("");




function getMovieApi() {
  axios.get('https://movies115.p.rapidapi.com/cartaz', options).then(
        (value)=>{
            stringifyJSON = JSON.stringify(value);
            movieObject.value = JSON.parse(stringifyJSON);       
        }
    );

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