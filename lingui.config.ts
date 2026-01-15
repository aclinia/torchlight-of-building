const config = {
  sourceLocale: "en",
  locales: ["en", "zh"],
  orderBy: "messageId",
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/legendaries",
      include: ["src/data/translate/legendary-names.ts"],
    },
    {
      path: "<rootDir>/src/locales/{locale}/talents",
      include: ["src/data/translate/talents.ts"],
    },
    {
      path: "<rootDir>/src/locales/{locale}/hero",
      include: ["src/data/translate/hero.ts"],
    },
    {
      path: "<rootDir>/src/locales/{locale}/skills",
      include: ["src/data/translate/skills.ts"],
    },
    {
      path: "<rootDir>/src/locales/{locale}/common",
      include: ["src"],
      exclude: [
        "src/data/translate/legendary-names.ts",
        "src/data/translate/talents.ts",
        "src/data/translate/skills.ts",
        "src/data/translate/hero.ts",
      ],
    },
  ],
};

export default config;
