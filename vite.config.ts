import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
// import browserslistToEsbuild from "browserslist-to-esbuild";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "/",
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  }), viteTsconfigPaths(), sentryVitePlugin({
    org: "irsl",
    project: "infollion-frontend",
    sourcemaps: {
      ignore: ["node_modules/**"],  // Ignore node_modules
    },
  })],

  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3001
    port: 3001,
  },
  build: {
    outDir: 'build',
    sourcemap: true
  },
//   build: {
//     // --> ["chrome79", "edge92", "firefox91", "safari13.1"]
//     target: browserslistToEsbuild([">0.2%", "not dead", "not op_mini all"]),
//   },
});