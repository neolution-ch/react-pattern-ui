/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "cjs"],
  moduleDirectories: ["node_modules", "<rootDir>"],
};
