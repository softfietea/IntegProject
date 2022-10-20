<template>



<v-container v-if= "!isLoaded" class="d-flex flex-row justify-center  fill-height">
        <div class="pixel-spinner align-center">

            <div class="pixel-spinner-inner"></div>
</div>
</v-container>



<div v-if="isLoaded " >
    <div v-if="!isFinish">
        <v-card >
    {{quizObject.data.results[numQuestion].question}}
</v-card>
<button  @click="verifyAnswer(arrayOfQuestion[0].toString() == currentCorrectAnswer)">a {{ [arrayOfQuestion[0]].toString()}}</button>
<br>
<button  @click="verifyAnswer(arrayOfQuestion[1].toString() == currentCorrectAnswer)">b {{ [arrayOfQuestion[1]].toString()}}</button>
<br>
<button  @click="verifyAnswer(arrayOfQuestion[2].toString() == currentCorrectAnswer)">c  {{ [arrayOfQuestion[2]].toString()}}</button>
<br>
<button  @click="verifyAnswer(arrayOfQuestion[3].toString() == currentCorrectAnswer)">d  {{ [arrayOfQuestion[3]].toString()}}</button>
<br>

    </div>

<div v-if="isFinish"> 
<h1>Quiz is Finish</h1>
<h2>Your Score is</h2>
<h3>{{score}}/10</h3>
<button @click="resetQuiz">Retry</button> 
</div>



</div>



</template>



<script setup>
import {ref,onMounted} from 'vue';
import axios from 'axios';

const arrayOfQuestion = ref([]);
var currentCorrectAnswer = ref('');
const quizObject = ref([]);
const numQuestion = ref(0);
const isLoaded = ref(false);
const isFinish = ref(false);
var quizStringify = ref("");
var score = ref(0);


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
        
    }else{
        numQuestion.value++;
        randomizeQuestion();
    }
   

}

function resetQuiz(){
    score.value = 0;
numQuestion.value = 0;
isLoaded.value = false;
isFinish.value = false;
getQuizApi();


}


 function getQuizApi (){

    axios.get("https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple").then((value)=>{
        quizStringify = JSON.stringify(value);
        quizObject.value = JSON.parse(quizStringify.replace(/&quot;/g,'').replace(/&#039;/g,'').replace(/&amp/,'&').replace(/&eacute;/,''));
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