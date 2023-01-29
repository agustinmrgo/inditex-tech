// module.exports = {
//   extends: [
//     // By extending from a plugin config, we can get recommended rules without having to add them manually.
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:import/recommended",
//     "plugin:jsx-a11y/recommended",
//     "plugin:eslint/recommended",
//     // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
//     // Make sure it's always the last config, so it gets the chance to override other configs.
//     "eslint-config-prettier",
//   ],
//   settings: {
//     react: {
//       // Tells eslint-plugin-react to automatically detect the version of React to use.
//       version: "detect",
//     },
//     // Tells eslint how to resolve imports
//     "import/resolver": {
//       node: {
//         paths: ["src"],
//         extensions: [".js", ".jsx", ".ts", ".tsx"],
//       },
//     },
//   },
//   rules: {
//     // Add your own rules here to override ones from the extended configs.
//   },
// };

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended", // Make sure this is always the last element in the array.
  ],
  plugins: ["simple-import-sort", "prettier"],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/accessible-emoji": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
};
