module.exports = {
    roots: [
      "<rootDir>/tests"
    ],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"],
    moduleFileExtensions: [
      "ts",
      "js"
    ]
  };
  