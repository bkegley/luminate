const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const tailwind = require('tailwindcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [autoprefixer(), tailwind()],
      })
    );
    return config;
  },
};
