import neolutionEslintConfig from "@neolution-ch/eslint-config-neolution";

export default [
  {
    ignores: ["**/cypress/"],
  },
  ...neolutionEslintConfig.configs.flat["react-library"],
];
