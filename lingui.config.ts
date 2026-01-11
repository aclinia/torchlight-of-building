const config = {
  sourceLocale: "en",
  locales: ["en", "zh"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/legendaries",
      include: ["src/data/translate/legendary-names.ts"],
    },
    {
      path: "<rootDir>/src/locales/{locale}/common",
      include: ["src"],
      exclude: ["src/data/translate/legendary-names.ts"],
    },
  ],
};

export default config;
