import { defineConfig } from 'vite'
import path from 'path'
import svgLoader from './src/plugins/svgLoader'

export default defineConfig({
  plugins: [svgLoader()],
  resolve: {
    // include .d.ts
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.d.ts']
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'jmarkd',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['marked', 'highlight.js'],
      output: {
        globals: {
          marked: 'marked',
          highlightjs: 'highlight.js'
        }
      }
    }
  }
})