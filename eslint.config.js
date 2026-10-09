import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // ✅ Allow `any`
      "@typescript-eslint/no-explicit-any": "off",

      // ✅ Turn off useEffect exhaustive deps warning
      "react-hooks/exhaustive-deps": "off",

      // ✅ Disallow console.log/info/debug (but allow warn/error)
      "no-console": ["error", { allow: ["warn", "error"] }],

      "react-refresh/only-export-components": "off",
    },
  },
]);
