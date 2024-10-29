import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config({
  files: ["**/*.ts"],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    eslintConfigPrettier,
  ],
});