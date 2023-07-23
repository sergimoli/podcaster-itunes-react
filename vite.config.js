// import { defineConfig } from "vite";

// import react from "@vitejs/plugin-react";
// import { createVuePlugin } from "@vitejs/plugin-vue";

// export default defineConfig(({ mode }) => {
//   return {
//     plugins: [react(), createVuePlugin()],
//     build: {
//       minify: mode === "production",
//       outDir: mode === "production" ? "dist" : "build",
//     },
//   };
// });

// import { defineConfig } from "vite";
// import react from "vite-plugin-react";
// import cssModules from "vite-plugin-css-modules";

// export default defineConfig(({ mode }) => {
//   return {
//     plugins: [react(), cssModules()],
//     build: {
//       minify: mode === "production",
//       outDir: mode === "production" ? "dist" : "build",
//     },
//   };
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
