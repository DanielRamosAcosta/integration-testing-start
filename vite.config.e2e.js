import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: [...configDefaults.include, "**/*.e2e-test.js"],
    exclude: [...configDefaults.exclude, "**/*.test.js"],
  },
})
