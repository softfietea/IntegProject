// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import colors from "vuetify/lib/util/colors";

// Vuetify
import { createVuetify, useTheme } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: "#84ED1C",
          secondary: "#EEE3CB",
          background: "#E9E9E9",
        },
      },
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
