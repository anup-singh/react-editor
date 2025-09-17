export default {
  // Test environment
  testEnvironment: "jsdom",

  // Setup files after Jest environment is loaded
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

  // Module name mapping for CSS and other assets
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Transform files
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },

  // Test file patterns
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(js|jsx|ts|tsx)",
    "<rootDir>/src/**/?(*.)(test|spec).(js|jsx|ts|tsx)",
  ],

  // Collect coverage from
  collectCoverageFrom: [
    "src/**/*.(js|jsx|ts|tsx)",
    "!src/**/*.d.ts",
    "!src/**/index.js",
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Module file extensions
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],

  // Ignore patterns
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/public/"],

  // Clear mocks between tests
  clearMocks: true,

  // Transform ES modules from node_modules
  transformIgnorePatterns: ["node_modules/(?!(marked|turndown)/)"],

  // Verbose output
  verbose: true,
}
