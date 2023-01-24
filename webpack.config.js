const path = require('path')
module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
}
