const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Set the mode to 'development' for a faster build and helpful error messages.
  mode: 'development',

  // The main entry point for your application.
  entry: './demo/index.js',

  // The output directory for the final bundle.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // Clean the dist folder before each build.
    clean: true,
  },

  // 1. Webpack Dev Server Configuration
  devServer: {
    // Specify the directory to serve static files from.
    static: {
      directory: path.join(__dirname, 'public'),
    },
    // Enable Gzip compression for faster loading.
    compress: true,
    // Set the port for the dev server.
    port: 3000,
    // Automatically open the browser when the server starts.
    open: true,
    // Enable Hot Module Replacement (HMR) for live reloading.
    hot: true,
    // A fallback to serve index.html for all 404 routes, essential for SPAs.
    historyApiFallback: true,
  },

  // 2. Loaders to handle different file types.
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          // Use style-loader in development to inject CSS into the DOM.
          // This allows for Hot Module Replacement of CSS.
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // 3. Plugins to perform tasks outside of basic compilation.
  plugins: [
    // Generates an HTML file and injects your bundled JS into it.
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // In development, we use style-loader.
    // MiniCssExtractPlugin is typically used for production builds.
  ],
};