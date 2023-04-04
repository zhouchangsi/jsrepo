import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import path from "path";

const projectRootDir = path.dirname("./");

export default {
  input: "src/index.ts",
  output: {
    dir: "bin",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    alias({
      entries: [
        {
          find: "src",
          replacement: path.resolve(projectRootDir, "src"),
        },
      ],
    }),
  ],
};
