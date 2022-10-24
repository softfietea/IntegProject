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
        dark: true,
        colors: {
          drawerBackground:"#13141d",
          highlightColorText: "#d6fb06",
          primary: "#dbddde",
          secondary: "#c76417",
          thirdy:"#da4e4b",
          background: "#070b13",
        },
      },
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
