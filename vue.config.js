const path = require('path')

module.exports = {
  configureWebpack: {
    entry: {
      handsfree: ['idempotent-babel-polyfill', path.join(__dirname, 'lib/Handsfree.js')]
    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: `[name].js`,
      library: 'Handsfree',
      libraryTarget: 'umd'
    },
    
    module: {
      rules: [
        /**
         * WASM
         */
        {
          test: /\.wasm$/,
          type: 'javascript/auto',
          loaders: ['arraybuffer-loader']
        }
      ]
    }
  }
}