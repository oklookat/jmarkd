import { defineConfig } from 'vite'
import path from 'path'
import SVGLoader from './src/plugins/svgLoader'


export default defineConfig({
  plugins: [
    new SVGLoader()
  ],
  resolve: {
    // include .d.ts
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.d.ts']
  },
  build: {
    lib: {
      name: 'jmarkd',
      formats: ['es'],
      entry: path.resolve(__dirname, './src/index.ts'),
      fileName: (format) => `index.${format}.js`
    }
  }
})