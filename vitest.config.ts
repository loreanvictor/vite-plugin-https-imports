import { defineConfig } from 'vite'


export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
      exclude: ['e2e', 'src/**/*.test.ts'],
    }
  }
})
