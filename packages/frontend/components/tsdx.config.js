const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const jit = require('@tailwindcss/jit');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [autoprefixer(), jit()],
      })
    );
    return config;
  },
};
