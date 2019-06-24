module.exports = {
    roots: [
      "<rootDir>/__tests__"
    ],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    setupFiles: [
      
    ],
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"],
    moduleFileExtensions: [
      "ts",
      "js"
    ]
  };
  