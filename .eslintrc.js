module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "jsx-a11y"],
  rules: {
    // React specific rules
    "react/react-in-jsx-scope": "off", // Not needed in React 17+
    "react/prop-types": "warn", // Warn for missing PropTypes
    "react/display-name": "error",
    "react/no-unused-prop-types": "warn",
    "react/jsx-key": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-uses-react": "off", // Not needed in React 17+
    "react/jsx-uses-vars": "error",
    "react/no-danger-with-children": "error",
    "react/no-deprecated": "warn",
    "react/no-direct-mutation-state": "error",
    "react/no-find-dom-node": "error",
    "react/no-is-mounted": "error",
    "react/no-render-return-value": "error",
    "react/no-string-refs": "error",
    "react/no-unescaped-entities": "error",
    "react/no-unknown-property": "error",
    "react/require-render-return": "error",
    "react/self-closing-comp": "warn",

    // React Hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // General JavaScript rules
    "no-console": "warn",
    "no-debugger": "warn",
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "React",
      },
    ],
    "no-var": "error",
    "prefer-const": "error",
    "prefer-arrow-callback": "warn",
    "no-duplicate-imports": "error",
    "no-multiple-empty-lines": ["error", { max: 2 }],
    "eol-last": "error",
    "comma-dangle": ["error", "only-multiline"],
    quotes: ["error", "single", { avoidEscape: true }],
    semi: ["error", "always"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "comma-spacing": ["error", { before: false, after: true }],

    // Accessibility rules (jsx-a11y)
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
  },
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
  overrides: [
    {
      files: [
        "gatsby-*.js",
        "gatsby-node.js",
        "gatsby-config.js",
        "gatsby-browser.js",
        "gatsby-ssr.js",
      ],
      env: {
        node: true,
      },
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["**/*.test.js", "**/*.spec.js", "**/__tests__/**/*.js"],
      env: {
        jest: true,
      },
      rules: {
        "no-console": "off",
      },
    },
  ],
}
