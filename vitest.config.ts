import { defineConfig } from 'vitest/config'


export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
      exclude: ['e2e', 'src/**/*.test.ts'],
      all: true,
      lines: 100,
      statements: 100,
      functions: 100,
      branches: 95,
    }
  }
})
