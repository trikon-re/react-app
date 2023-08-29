// vite.config.ts
import { defineConfig } from "file:///E:/Codespace/@trikon-re/react-app/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Codespace/@trikon-re/react-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///E:/Codespace/@trikon-re/react-app/node_modules/vite-plugin-tsconfig-paths/lib/esm/index.mjs";
import { VitePWA } from "file:///E:/Codespace/@trikon-re/react-app/node_modules/vite-plugin-pwa/dist/index.mjs";
var vite_config_default = defineConfig({
  optimizeDeps: {
    include: ["antd", "lodash", "moment"]
  },
  server: {
    port: 3e3,
    open: "/"
  },
  build: {
    outDir: "build"
  },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      disable: true,
      registerType: "autoUpdate",
      devOptions: {
        enabled: false
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2Rlc3BhY2VcXFxcQHRyaWtvbi1yZVxcXFxyZWFjdC1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXENvZGVzcGFjZVxcXFxAdHJpa29uLXJlXFxcXHJlYWN0LWFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovQ29kZXNwYWNlL0B0cmlrb24tcmUvcmVhY3QtYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS1wbHVnaW4tdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0b3B0aW1pemVEZXBzOiB7XHJcblx0XHRpbmNsdWRlOiBbXCJhbnRkXCIsIFwibG9kYXNoXCIsIFwibW9tZW50XCJdLFxyXG5cdH0sXHJcblx0c2VydmVyOiB7XHJcblx0XHRwb3J0OiAzMDAwLFxyXG5cdFx0b3BlbjogXCIvXCIsXHJcblx0fSxcclxuXHRidWlsZDoge1xyXG5cdFx0b3V0RGlyOiBcImJ1aWxkXCIsXHJcblx0fSxcclxuXHRwbHVnaW5zOiBbXHJcblx0XHRyZWFjdCgpLFxyXG5cdFx0dHNjb25maWdQYXRocygpLFxyXG5cdFx0Vml0ZVBXQSh7XHJcblx0XHRcdGRpc2FibGU6IHRydWUsIC8vIEVuYWJsZSBpZiB5b3Ugd2FudFxyXG5cdFx0XHRyZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxyXG5cdFx0XHRkZXZPcHRpb25zOiB7XHJcblx0XHRcdFx0ZW5hYmxlZDogZmFsc2UsIC8vIEVuYWJsZSB0byBnZXQgcHdhIGluIGRldmVsb3BtZW50IG1vZGVcclxuXHRcdFx0fSxcclxuXHRcdFx0Ly8gd29ya2JveDoge1xyXG5cdFx0XHQvLyBcdGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcclxuXHRcdFx0Ly8gfSxcclxuXHRcdH0pLFxyXG5cdF0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZSLFNBQVMsb0JBQW9CO0FBQzFULE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsY0FBYztBQUFBLElBQ2IsU0FBUyxDQUFDLFFBQVEsVUFBVSxRQUFRO0FBQUEsRUFDckM7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNQO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLElBQ2QsUUFBUTtBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLFFBQ1gsU0FBUztBQUFBLE1BQ1Y7QUFBQSxJQUlELENBQUM7QUFBQSxFQUNGO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
