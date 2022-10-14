<template>
  <v-container>
    <h1 class="title">Composition API</h1>
    <br />
    <v-card
      title="Vue 3 Composition API"
      subtitle="Research about composition API"
      color="#EEF2E6"
      text="The Options API used in Vue 2 has limits, so the Composition API was added to the Vue framework to address these issues. The Composition API offers a method for controlling reactivity in a program without sacrificing the structure and readability of the code. The Options API is a substitute that provides more advantages. Authors can create components for Vue using imported functions rather than declarative functions thanks to the Composition API. Writing clear, logical, and effective code is made possible by composition API. When compared to the choices API with comparable code, the composition API also provides better build process minification. What exactly do Options API and Composition API mean?
To setup a component with attributes and methods using the Options API, we were only able to use an object. To accomplish the identical tasks, however, we leverage several hooks in the Compositions API. Our code is entirely under our control thanks to this capability. The way your code is organized is up to you. Why does Vue 3 Composition API exist?
Composition API, which was introduced in Vue 3, enables developers to write components more effectively. Developers can use this API to arrange the logical sections of code, which makes for more understandable code. Composition API is a feature that comes standard with Vue 3 and is also accessible in Vue 2 with the @vue/composition-api plugin."
    ></v-card>

    <v-card
      title="Additional Information"
      subtitle="This is the reference of the research"
      color="#EEF2E6"
      text="The Vue framework now includes the Composition API, which was developed to remedy the shortcomings of the Options API used in Vue 2. The Composition API offers a method for controlling reactivity in a program without sacrificing the structure and readability of the code. The Options API is a substitute that provides more advantages. The Composition API allows you to restructure data, methods, computed, and watched in a more comprehensible manner. By enabling you to more conveniently combine pertinent code together as your code expands, the Composition API addresses the first issue. By utilizing composables to improve code reuse, it addresses the second issue. It was developed for improved extensibility and code structure since Vue projects become harder to manage as they got bigger and more sophisticated. It additionally provides considerably improved TypeScript support."
    ></v-card>
  </v-container>
</template>

<script setup></script>

<style scoped>
.title {
  color: darkslategrey;
}
</style>
