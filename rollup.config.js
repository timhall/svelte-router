import replace from 'rollup-plugin-replace';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

const production = process.env.NODE_ENV
  ? process.env.NODE_ENV === 'production'
  : !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'umd',
    file: 'umd/svelte-history.js',
    globals: {
      history: 'History'
    }
  },
  name: 'SvelteHistory',
  external: ['history'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development'
      )
    }),

    svelte({
      // enable run-time checks when not in production
      dev: !production,
      store: true
    }),

    resolve(),
    commonjs(),
    filesize(),

    production && buble({ exclude: 'node_modules/**' }),
    production && uglify()
  ],

  watch: {
    chokidar: true
  }
};
