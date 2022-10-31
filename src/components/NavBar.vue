<template>
  <nav>
    <v-toolbar app color="background">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
      Integrative Programming and Technologies
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="#3D8361" v-bind="props"> Dropdown </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            router
            :to="item.path"
            :prepend-icon="item.icon"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" floating="true" color="drawerBackground">
      <v-container class="mx-15" fluid>
        <v-avatar image="../src/assets/alfiePicture.jpg" size="100"> </v-avatar>
      </v-container>
      <div class="navHeader">Alfie C. Tribaco</div>
      <div class="navHeaderSecondary">IT41S1</div>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        router
        :to="item.path"
        :prepend-icon="item.icon"
        class="itemCard"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <button @click="signOut"> Sign out</button>
    </v-navigation-drawer>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { getAuth } from "@firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const drawer = ref(false);
const items = ref([
  { title: "Personal Life", icon: "mdi-account", path: "/personalLife" },
  {
    title: "Programming Skills",
    icon: "mdi-laptop",
    path: "/programmingSkills",
  },
  {
    title: "About the Program",
    icon: "mdi-book",
    path: "/aboutYourProgram",
  },
  { title: "About TIP", icon: "mdi-school", path: "/aboutTip" },
  {
    title: "Simple Calculator",
    icon: "mdi-numeric",
    path: "/simpleCalculator",
  },
  {
    title: "String Manipulation",
    icon: "mdi-alphabetical-variant",
    path: "/stringManipulation",
  },
  { title: "Vuetify", icon: "mdi-pencil-ruler", path: "/vuetify" },
  { title: "Composition API", icon: "mdi-code-json", path: "/compositionApi" },
  { title: "Area Activity", icon: "mdi-vector-triangle", path: "/area" },
  { title: "Axios Activity", icon: "mdi-api", path: "/axios" },
  { title: "Quiz Activity", icon: "mdi-help", path: "/quiz" },
  { title: "Login Activity", icon: "mdi-help", path: "/login" },
]);

function toggleDrawer() {
  return (drawer.value = !drawer.value);
}

function signOut(){
getAuth().signOut();
router.push('/')
}


</script>

<style scoped>
.itemCard {
  margin: 10px;
}

.navHeader {
  margin: 20px;
  margin-bottom: -10px;
  font-size: 30px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: bold;
}

.navHeaderSecondary {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 10px;
}
</style>
