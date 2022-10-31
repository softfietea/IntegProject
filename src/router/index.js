import { createRouter, createWebHistory } from "vue-router";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import AboutTipView from "../views/AboutTip.vue";
import AboutYourProgramView from "../views/AboutYourProgram.vue";
import PersonalLifeView from "../views/PersonalLife.vue";
import ProgrammingSkillView from "../views/ProgrammingSkill.vue";
import SimpleCalculatorView from "../views/SimpleCalculator.vue";
import StringManipulation from "../views/StringManipulation.vue";
import VuetifyView from "../views/Vuetify.vue";
import CompositionApiView from "../views/CompositionApi.vue";
import AreaView from "../views/Area.vue";
import AxiosView from "../views/Axios.vue";
import QuizView from "../views/Quiz.vue";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import RegisterSuccessView from "../components/RegisterSuccessful.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/registersuccessful",
      name: "RegisterSuccessful",
      component: RegisterSuccessView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/personalLife",
      name: "PersonalLife",
      component: PersonalLifeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/aboutTip",
      name: "AboutTip",
      component: AboutTipView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/aboutYourProgram",
      name: "AboutYourProgram",
      component: AboutYourProgramView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/programmingSkills",
      name: "ProgrammingSkills",
      component: ProgrammingSkillView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/simpleCalculator",
      name: "SimpleCalculator",
      component: SimpleCalculatorView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/stringManipulation",
      name: "StringManipulation",
      component: StringManipulation,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/vuetify",
      name: "Vuetify",
      component: VuetifyView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/compositionApi",
      name: "CompositionApi",
      component: CompositionApiView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/area",
      name: "Area",
      component: AreaView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/axios",
      name: "Axios",
      component: AxiosView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/quiz",
      name: "Quiz",
      component: QuizView,
      meta: {
        requiresAuth: true
      }
    },
  ],
});


const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = getAuth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth &&  !await getCurrentUser()){
    next('Login');
  }else{
    next();
  }
});

export default router;
