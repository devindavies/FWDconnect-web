module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ["import", "react", "react-hooks", "@typescript-eslint", "graphql"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  rules: {
    "react/prop-types": "off",
    "no-useless-catch": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/camelcase": "off",
    /**'graphql/template-strings': [
        'error',
        {
          env: 'relay',
          schemaJsonFilepath: `${__dirname}/schema.json`,
          tagName: 'graphql'
        }
      ],**/
    "import/no-cycle": ["warn"],
    "import/no-absolute-path": ["warn"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
