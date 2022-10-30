import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyCk3ZGihBn-xDfdllCMUGK6plSreuM6y1s",
    authDomain: "integproject-3c3bf.firebaseapp.com",
    projectId: "integproject-3c3bf",
    storageBucket: "integproject-3c3bf.appspot.com",
    messagingSenderId: "200604761379",
    appId: "1:200604761379:web:f82897c09064a136702096",
    measurementId: "G-VTRPVHN65S"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

loadFonts();

createApp(App).use(router).use(vuetify).mount("#app");
