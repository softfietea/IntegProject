<template>

<div class="ml-16 fill-height">
  

        <h1>List of Movies</h1>



  <v-container v-if= "apiIsLoading" class="d-flex flex-row justify-center align-center fill-height">
        <div class="pixel-spinner align-center">

            <div class="pixel-spinner-inner"></div>
</div>
</v-container>

<div v-else>
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

        </div>
      </div> 
</template>



<script setup>

import axios from 'axios';
import {ref, onMounted} from 'vue';

const movieObject = ref([]);
var stringifyJSON = ref("");
var apiIsLoading = ref(true);


function getMovieApi() {
  axios.get('https://movies115.p.rapidapi.com/cartaz', options).then(
        (value)=>{
           apiIsLoading.value = false;
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


<style>

.pixel-spinner, .pixel-spinner * {
      box-sizing: border-box;
    }

    .pixel-spinner {
      height: 70px;
      width: 70px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .pixel-spinner .pixel-spinner-inner {
      width: calc(70px / 7);
      height: calc(70px / 7);
      background-color: #ff1d5e;
      color: #ff1d5e;
      box-shadow: 15px 15px  0 0,
                  -15px -15px  0 0,
                  15px -15px  0 0,
                  -15px 15px  0 0,
                  0 15px  0 0,
                  15px 0  0 0,
                  -15px 0  0 0,
                  0 -15px 0 0;
      animation: pixel-spinner-animation 2000ms linear infinite;
    }

    @keyframes pixel-spinner-animation {
      50% {
        box-shadow: 20px 20px 0px 0px,
                    -20px -20px 0px 0px,
                    20px -20px 0px 0px,
                    -20px 20px 0px 0px,
                    0px 10px 0px 0px,
                    10px 0px 0px 0px,
                    -10px 0px 0px 0px,
                    0px -10px 0px 0px;
      }
      75% {
        box-shadow: 20px 20px 0px 0px,
                    -20px -20px 0px 0px,
                    20px -20px 0px 0px,
                    -20px 20px 0px 0px,
                    0px 10px 0px 0px,
                    10px 0px 0px 0px,
                    -10px 0px 0px 0px,
                    0px -10px 0px 0px;
      }
      100% {
        transform: rotate(360deg);
      }
    }


</style>