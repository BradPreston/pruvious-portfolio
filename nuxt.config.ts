import env from "./lib/Env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/google-fonts", "pruvious"],
  googleFonts: {
    families: {
      Lato: {
        wght: [400, 700],
        ital: [400, 700],
      },
      Poppins: [500],
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  pruvious: {
    jwt: {
      secretKey: env.PRUVIOUS_SECRET_KEY,
    },
    standardCollections: {
      pages: false,
    },
    database: env.DATABASE_URL,
  },
  compatibilityDate: "2026-02-24",
  runtimeConfig: {
    public: {
      showBanner: false,
    },
  },
});
