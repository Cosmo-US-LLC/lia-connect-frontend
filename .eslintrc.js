module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off",
    "react/no-unescaped-entities": "off",
    "no-irregular-whitespace": "off",
    "no-constant-condition": "off",
    "no-extra-semi": "off",
    "no-empty": "off",
    "react/jsx-key": "off",
  },
};
