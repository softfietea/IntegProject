<template>
  <!--
    Not Started Yet.
-->
  <v-container
    v-if="!isStart"
    class="d-flex flex-column align-stretch justify-center"
  >
    <h1 class="text-highlightColorText mb-5">Game Quiz</h1>
    <h3 class="text-primary mb-5">
      Please Input your name to save to leaderboard after the quiz.
    </h3>
    <v-text-field
      color="white"
      label="Input Player Name"
      v-model="username"
      hide-details="auto"
    ></v-text-field>
    <button class="button mt-5" @click="startGame">Start Quiz</button>

    <v-snackbar v-model="showSnackBar">
      Ooops Please make sure you put a name before you start.

      <template>
        <v-btn color="pink" text @click="showSnackBar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>

  <!--
    Quiz Started.
-->

  <div v-if="isStart">
    <v-container
      v-if="!isLoaded"
      class="d-flex flex-row justify-center align-center fill-height"
    >
      <div class="pixel-spinner align-center">
        <div class="pixel-spinner-inner"></div>
      </div>
    </v-container>

    <!-- Check if the API fetching is done -->

    <div v-if="isLoaded">
      <!-- The Quiz is ongoing.-->

      <div v-if="!isFinish">
        <v-card class="d-flex flex-row justify-center align-center pa-14">
          {{ quizObject.data.results[numQuestion].question }}
        </v-card>

        <div class="choices mt-10">
          <button
            class="button"
            @click="
              verifyAnswer(
                arrayOfQuestion[0].toString() == currentCorrectAnswer
              )
            "
          >
            A. {{ [arrayOfQuestion[0]].toString() }}
          </button>
          <br />
          <button
            class="button"
            @click="
              verifyAnswer(
                arrayOfQuestion[1].toString() == currentCorrectAnswer
              )
            "
          >
            B.{{ [arrayOfQuestion[1]].toString() }}
          </button>
          <br />
          <button
            class="button"
            @click="
              verifyAnswer(
                arrayOfQuestion[2].toString() == currentCorrectAnswer
              )
            "
          >
            C. {{ [arrayOfQuestion[2]].toString() }}
          </button>
          <br />
          <button
            class="button"
            @click="
              verifyAnswer(
                arrayOfQuestion[3].toString() == currentCorrectAnswer
              )
            "
          >
            D. {{ [arrayOfQuestion[3]].toString() }}
          </button>
          <br />
        </div>
      </div>

      <!-- The quiz is finish -->

      <div v-if="isFinish">
        <v-container
          class="d-flex flex-column justify-space-around align-center fill-height"
        >
          <h1>Quiz is Finish</h1>
          <h2>Your Score is</h2>
          <h1>{{ score }}/10</h1>
          <v-card variant="outlined">
            <h1 class="ma-5">Leaderboard:</h1>
            <v-card
              v-for="player in leaderboard"
              v-bind:key="player.user"
              width="500px"
              class="ma-10 red"
            >
              <v-row class="pa-5"
                ><v-card-item>Name: {{ player.user }}</v-card-item>
                <v-card-item>Score: {{ player.topscore }}</v-card-item></v-row
              >
            </v-card>
          </v-card>
          <button class="button mt-5" width="400px" @click="resetQuiz">
            Retry
          </button>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import {
  getDocs,
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "@firebase/firestore";
import db from "../main";
import { getAuth } from "@firebase/auth";

const username = ref("");
const arrayOfQuestion = ref([]);
var currentCorrectAnswer = ref("");
const quizObject = ref([]);
const numQuestion = ref(0);
const isLoaded = ref(false);
const isFinish = ref(false);
const isStart = ref(false);
var quizStringify = ref("");
var score = ref(0);
const leaderboard = ref([]);
const quizLeaderboardCollection = collection(db, "quiz");
const showSnackBar = ref(false);

async function addUserLeaderboardFirestore() {
  const doctor = doc(db, "quiz", username.value);
  await setDoc(doctor, { name: username.value, score: score.value }).then(
    (val) => {
      console.log("success");
    }
  );
}

function compareScore(a, b) {
  return b.topscore - a.topscore;
}

async function addUserOnLeaderboard(name, score) {
  const queryLeaderboard = query(
    quizLeaderboardCollection,
    orderBy("score", "desc"),
    limit(5)
  );
  await getDocs(queryLeaderboard).then((val) => {
    leaderboard.value = [];
    val.docs.forEach((value) => {
      leaderboard.value.push({
        user: value.get("name"),
        topscore: value.get("score"),
      });
      leaderboard.value.sort(compareScore);
    });
  });

  console.log(leaderboard.value);
}

async function checkUserObLeaderboard(name, score) {
  addUserLeaderboardFirestore();
  if (leaderboard.value.length < 5) {
    addUserOnLeaderboard(name, score);
    leaderboard.value.sort(compareScore);
  }
  if (leaderboard.value.length >= 5) {
    leaderboard.value.sort(compareScore);
    if (score > leaderboard.value[leaderboard.value.length - 1].topscore) {
      leaderboard.value.pop();
      addUserOnLeaderboard(name, score);
      leaderboard.value.sort(compareScore);
    } else {
      console.log("Your score do not meet requirements");
    }
  }
}

function randomizeQuestion() {
  arrayOfQuestion.value = [];
  currentCorrectAnswer.value =
    quizObject.value.data.results[numQuestion.value].correct_answer;
  arrayOfQuestion.value.push(
    quizObject.value.data.results[numQuestion.value].correct_answer
  );
  arrayOfQuestion.value.push(
    quizObject.value.data.results[numQuestion.value].incorrect_answers[0]
  );
  arrayOfQuestion.value.push(
    quizObject.value.data.results[numQuestion.value].incorrect_answers[1]
  );
  arrayOfQuestion.value.push(
    quizObject.value.data.results[numQuestion.value].incorrect_answers[2]
  );
  shuffleArray(arrayOfQuestion.value);
  console.log("array of question: " + arrayOfQuestion.value);
  console.log("Current Answer: " + currentCorrectAnswer.value);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function startGame() {
  if (username.value == "") {
    showSnackBar.value = true;
    isStart.value = false;
  } else {
    isStart.value = true;
  }
}

function verifyAnswer(answer) {
  console.log(answer);
  console.log(quizObject.value.data.results[numQuestion.value].correct_answer);
  if (answer == true) {
    score.value++;
    nextQuestion();
  } else {
    nextQuestion();
  }
}

function nextQuestion() {
  if (numQuestion.value == 9) {
    isFinish.value = true;
    if (isFinish.value) {
      checkUserObLeaderboard(username.value, score.value);
    }
  } else {
    numQuestion.value++;
    randomizeQuestion();
  }
}

function resetQuiz() {
  username.value = "";
  isStart.value = false;
  score.value = 0;
  numQuestion.value = 0;
  isLoaded.value = false;
  isFinish.value = false;
  getQuizApi();
}

function getQuizApi() {
  axios
    .get(
      "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple"
    )
    .then((value) => {
      quizStringify = JSON.stringify(value);
      quizObject.value = JSON.parse(
        quizStringify
          .replace(/&quot;/g, "")
          .replace(/&#039;/g, "")
          .replace(/&amp/g, "&")
          .replace(/&eacute;/g, "")
          .replace(/&Uuml;/g, "")
      );
      isLoaded.value = true;
      randomizeQuestion();
    });
}

onMounted(async () => {
  getQuizApi();

  console.log(quizObject);
  console.log(arrayOfQuestion);
});
</script>

<style>
.choices {
  display: flex;
  flex-direction: column;
  background-color: "primary";
  align-items: center;
}

.button {
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

.button:hover {
  background-color: #ff6f98;
}

.button:active {
  background-color: #ff0048;
  box-shadow: 0 5px rgb(255, 191, 226);
  transform: translateY(4px);
}
</style>
