module.exports = {
  configureWebpack: {
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