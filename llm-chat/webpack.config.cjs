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
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
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
        type: 'asset/resource',
        generator: {
          emit: false,
        },
      },
    ],
  },
  externals: {
    // Don't bundle React if it's available globally
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  plugins: [],
  optimization: {
    usedExports: true,
    sideEffects: false,
  },
};
