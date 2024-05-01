import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: 'src/tests/setup.ts',
    css: true,
    coverage: {
      include: ["src/ui/**/*.{ts,tsx}"],
      exclude: [
        ...configDefaults.exclude,
      ]
    }
  },
})