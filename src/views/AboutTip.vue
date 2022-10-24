<template>
  <v-container>
    <h1 class="title text-highlightColorText">Technological Institute of the Philippines</h1>
    <br />
    <v-card
    variant="outlined"
      class="cardItem"
    >
    <v-img
     src="../src/assets/tip.jpg"
     height="260px"
     cover
    ></v-img>
  <v-card-title >About TIP</v-card-title>
  <v-card-subtitle>This section talks about what is TIP</v-card-subtitle>
  <v-card-text>The Technological Institute of the Philippines (T.I.P.) is one of the country’s premier technological, engineering, and computing higher educational institutions.  It is a private non-sectarian stock school founded on February 8, 1962 by a group of educators headed by Engineer Demetrio A. Quirino, Jr. and Dr. Teresita U. Quirino. Using an outcomes-based educational model with its locally and globally accredited programs, T.I.P. allows students to acquire industry-desired qualities and essential experiences that better equip them to be effective as soon as they enter the workforce or set up their own business.</v-card-text>
  
  </v-card>

    <v-card
      class="cardItem"
      variant="outlined"
    >
  <v-card-title>
    Vision
  </v-card-title>
  <v-card-text>We envision a better life for Filipinos by empowering our students with the best globally competitive technological education in engineering, computing, and allied disciplines.</v-card-text>
  </v-card>

    <v-card
      class="cardItem"
      variant="outlined"
    >
  <v-card-title>Mission</v-card-title>
  <v-card-text>Through digitalization and innovation in academic design and delivery, T.I.P. students, faculty, staff, and industry partners work together in both traditional and online/flexible learning to transform our students to achieve optimal student outcomes:
Full competence in their fields of study
Ability to apply their competencies, mindsets, and values to serve the needs of industry or to pursue technopreneurship to solve societal problems.</v-card-text>
  </v-card>

    <v-card class="cardItem" variant="outlined" title="TIP Link" 
      ><a href="https://www.tip.edu.ph/about-tip/history/">
        Click here to View the page of TIP
      </a>
      </v-card
    >
  </v-container>
</template>

<script setup></script>

<style scoped>
.title {
  color: darkslategrey;
}

.cardItem {
  margin: 20px;
}

a {
  margin: 15px;
}
</style>
