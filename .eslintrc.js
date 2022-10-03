module.exports = {
  extends: ["eslint:recommended"],
  rules: {
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "info"],
      },
    ],
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "script",
    requireConfigFile: false,
  },
  globals: {
    // window: true,
  },
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
};
