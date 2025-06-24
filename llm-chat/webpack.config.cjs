const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/integration.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'integration.js',
    library: 'WidgetIntegration',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  externals: {
    // Don't bundle React if it's available globally
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  optimization: {
    usedExports: true,
    sideEffects: false,
  },
};
