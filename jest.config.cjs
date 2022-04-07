/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "cjs"],
  moduleDirectories: ["node_modules", "<rootDir>"],
};
