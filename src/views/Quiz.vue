<template>

<v-container v-if= "!isStart" class="d-flex flex-column align-center justify-center" >
   
    <v-col>


            <v-text-field
      color="#ff1d5e"
      label="Username"
      v-model="username"
      hide-details="auto"
    ></v-text-field>
    <button class="button mt-5"  @click="startGame">Start Quiz</button>
</v-col>
</v-container>


<div v-if="isStart">



<v-container v-if= "!isLoaded" class="d-flex flex-row justify-center align-center fill-height">
        <div class="pixel-spinner align-center">

            <div class="pixel-spinner-inner"></div>
</div>
</v-container>



<div v-if="isLoaded " >
    <div v-if="!isFinish">
        <v-card class="d-flex flex-row justify-center align-center pa-14">
    {{quizObject.data.results[numQuestion].question}}
</v-card>

<div class="choices mt-10">


<button class="button" @click="verifyAnswer(arrayOfQuestion[0].toString() == currentCorrectAnswer)">A. {{ [arrayOfQuestion[0]].toString()}}</button>
<br>
<button class="button" @click="verifyAnswer(arrayOfQuestion[1].toString() == currentCorrectAnswer)">B.{{ [arrayOfQuestion[1]].toString()}}</button>
<br>
<button class="button" @click="verifyAnswer(arrayOfQuestion[2].toString() == currentCorrectAnswer)">C. {{ [arrayOfQuestion[2]].toString()}}</button>
<br>
<button class="button" @click="verifyAnswer(arrayOfQuestion[3].toString() == currentCorrectAnswer)">D. {{ [arrayOfQuestion[3]].toString()}}</button>
<br>
</div>
    </div>

<div v-if="isFinish"> 
<v-container class="d-flex flex-column justify-space-around align-center fill-height">
<h1>Quiz is Finish</h1>
<h2>Your Score is</h2>
<h1>{{score}}/10</h1>


<v-card >
    <h1 class="ma-5">Leaderboard: </h1>
    <v-card v-for="player in leaderboard" key="player.user" width="500px" class="ma-10 red" >
        <v-row class="pa-5" ><v-card-item>Name: {{ player.user}}</v-card-item>
<v-card-item>Score:  {{player.topscore}}</v-card-item></v-row>
    </v-card>


</v-card>
<button class="button" width="400px" @click="resetQuiz">Retry</button> 
</v-container>



</div>



</div>


</div>
</template>



<script setup>
import {ref,onMounted} from 'vue';
import axios from 'axios';
const username = ref('');
const arrayOfQuestion = ref([]);
var currentCorrectAnswer = ref('');
const quizObject = ref([]);
const numQuestion = ref(0);
const isLoaded = ref(false);
const isFinish = ref(false);
const isStart = ref(false);
var quizStringify = ref("");
var score = ref(0);
const leaderboard = ref([]);

function compareScore(a, b) {

return b.topscore - a.topscore;
}


function addUserOnLeaderboard(name,score){
    leaderboard.value.push({user:name,topscore:score});
    leaderboard.value.sort(compareScore); 
    console.log(leaderboard.value);
}

function checkUserObLeaderboard(name,score){
 
    if(leaderboard.value.length < 5){
        addUserOnLeaderboard(name,score);
        leaderboard.value.sort(compareScore); 
    }
if(leaderboard.value.length >= 5){
 leaderboard.value.sort(compareScore); 
 if(score > leaderboard.value[leaderboard.value.length - 1].topscore){
 leaderboard.value.pop();
 addUserOnLeaderboard(name,score);
 leaderboard.value.sort(compareScore); 
 }else{
    console.log("Your score do not meet requirements");
}
}



}

function randomizeQuestion() {
    arrayOfQuestion.value = [];
    currentCorrectAnswer.value = quizObject.value.data.results[numQuestion.value].correct_answer;
    arrayOfQuestion.value.push(quizObject.value.data.results[numQuestion.value].correct_answer);
    arrayOfQuestion.value.push(quizObject.value.data.results[numQuestion.value].incorrect_answers[0]);
    arrayOfQuestion.value.push(quizObject.value.data.results[numQuestion.value].incorrect_answers[1]);
    arrayOfQuestion.value.push(quizObject.value.data.results[numQuestion.value].incorrect_answers[2]);
    shuffleArray(arrayOfQuestion.value);
    console.log("array of question: "+ arrayOfQuestion.value);
    console.log("Current Answer: "+currentCorrectAnswer.value);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function startGame(){
    isStart.value = true;
}


function verifyAnswer(answer){
    console.log(answer);
    console.log(quizObject.value.data.results[numQuestion.value].correct_answer);
if(answer == true){
score.value++;
nextQuestion();
}else{
nextQuestion();
}


}


function nextQuestion() {
 
    if(numQuestion.value == 9){
        isFinish.value = true;
        if(isFinish.value){
            checkUserObLeaderboard(username.value,score.value)
        }
    }else{
        numQuestion.value++;
        randomizeQuestion();
    }
   

}

function resetQuiz(){
    username.value = "";
    isStart.value = false;
score.value = 0;
numQuestion.value = 0;
isLoaded.value = false;
isFinish.value = false;
getQuizApi();
}


 function getQuizApi (){
    axios.get("https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple").then((value)=>{
        quizStringify = JSON.stringify(value);
        quizObject.value = JSON.parse(quizStringify.replace(/&quot;/g,'').replace(/&#039;/g,'').replace(/&amp/g,'&').replace(/&eacute;/g,'').replace(/&Uuml;/g,''));
        isLoaded.value = true;
        randomizeQuestion();
});
};

onMounted(()=>{
getQuizApi();
console.log(quizObject);
console.log(arrayOfQuestion);
});

</script>

<style>

.choices{
    display:flex;
    flex-direction: column;
    background-color: 'primary';
    align-items: center;
}

.button{
  padding: 15px 25px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #ff1d5e;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px rgb(78, 44, 63);
   height: 60px;
   max-width: 600px;
}

.button:hover {background-color: #ff6f98}

.button:active {
  background-color: #ff0048;
  box-shadow: 0 5px rgb(255, 191, 226);
  transform: translateY(4px);
}


</style>