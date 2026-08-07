import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ptBR from "./pt-BR";

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",

  lng: "pt-BR",
  fallbackLng: "en",

  debug: __DEV__,

  resources: {
    "pt-BR": {
      translation: ptBR,
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
