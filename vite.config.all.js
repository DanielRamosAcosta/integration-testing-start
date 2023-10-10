import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: [...configDefaults.include, "**/*.integration-test.js", "**/*.e2e-test.js"],
  },
})
