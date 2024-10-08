import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";

const input = "src/index.ts";

const plugins = [
  sass({ output: "dist/styles.css" }),
  external({
    includeDependencies: true,
  }),
  typescript({
    clean: true,
    exclude: ["**/__tests__", "**/*.test.ts", "**/stories/**/*", "**/*test.tsx, **/scss/**"],
  }),
  commonjs({
    include: /\/node_modules\//,
  }),
  nodeResolve(),
  terser({
    output: { comments: true },
    compress: {
      drop_console: false,
    },
  }),
];

export default [
  {
    input,
    output: {
      file: "dist/index.js",
      format: "cjs",
      name: "ReactPatternUI",
      sourcemap: true,
      globals: { react: "React" },
      exports: "named",
      sourcemap: true,
      interop: "auto",
    },
    plugins,
  },
  {
    input,
    output: {
      file: "dist/index.modern.js",
      format: "esm",
      name: "ReactPatternUI",
      sourcemap: true,
      globals: { react: "React" },
      exports: "named",
      sourcemap: true,
    },
    plugins,
  },
  {
    input,
    output: {
      file: "dist/index.umd.js",
      format: "umd",
      name: "ReactPatternUI",
      sourcemap: true,
      globals: { react: "React" },
      exports: "named",
      sourcemap: true,
    },
    plugins,
  },
];
