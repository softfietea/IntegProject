import { createRouter, createWebHistory } from "vue-router";
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/personalLife",
    },
    {
      path: "/personalLife",
      name: "PersonalLife",
      component: PersonalLifeView,
    },
    {
      path: "/aboutTip",
      name: "AboutTip",
      component: AboutTipView,
    },
    {
      path: "/aboutYourProgram",
      name: "AboutYourProgram",
      component: AboutYourProgramView,
    },
    {
      path: "/programmingSkills",
      name: "ProgrammingSkills",
      component: ProgrammingSkillView,
    },
    {
      path: "/simpleCalculator",
      name: "SimpleCalculator",
      component: SimpleCalculatorView,
    },
    {
      path: "/stringManipulation",
      name: "StringManipulation",
      component: StringManipulation,
    },
    {
      path: "/vuetify",
      name: "Vuetify",
      component: VuetifyView,
    },
    {
      path: "/compositionApi",
      name: "CompositionApi",
      component: CompositionApiView,
    },
    {
      path: "/area",
      name: "Area",
      component: AreaView,
    },
    {
      path: "/axios",
      name: "Axios",
      component: AxiosView,
    },
    {
      path: "/quiz",
      name: "Quiz",
      component: QuizView,
    },
  ],
});

export default router;
