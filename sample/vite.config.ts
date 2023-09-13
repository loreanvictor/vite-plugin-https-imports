import inspect from 'vite-plugin-inspect'
import httpsImports from '../src'


export default {
  plugins: [
    httpsImports(),
    inspect({
      build: true,
      outputDir: '.vite-inspect'
    }),
  ]
}
