const esbuild = require('esbuild')
const sveltePreprocess = require('svelte-preprocess')
const production = !process.env.ROLLUP_WATCH

module.exports = {
  preprocess: sveltePreprocess({
    defaults: {
      script: 'typescript',
      style: 'scss',
    },
    postcss: {
      plugins: [require('autoprefixer')()],
    },
    scss: {
      prependData: "@import 'src/styles/variables.scss';",
    },
    sourceMap: production,

    typescript({ content }) {
      const { js: code } = esbuild.transformSync(content, {
        loader: 'ts',
      })

      return { code }
    },
  }),
}
