import path from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // 1. Module Mode
  mode: 'production', // Use 'production' for optimized build

  // 2. Entry Point
  // Your main TypeScript/React file
  entry: './src/index.ts',

  // 3. Output Configuration
  output: {
    // The target directory for all output files
    path: path.resolve(__dirname, 'dist'),
    // The name of the bundled output file
    filename: 'index.js',
    // Universal module definition to work with require(), import, or script tags
    library: {
      type: 'umd',
      name: 'YourModuleName', // Replace with your desired module name
    },
    // Allows the module to be used in various environments (browser, Node.js)
    globalObject: 'this',
    // Clean the output directory before emit
    clean: true,
  },

  // 4. Resolve Extensions
  // Allows importing modules without specifying these extensions
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  // 5. External Dependencies
  // Crucial for npm modules: prevents bundling external libraries (like react)
  // that the consumer should already have or install.
    externals: [nodeExternals({
      allowlist: [/\.css$/],
    })],

  // 6. Module Rules (Loaders)
  module: {
    rules: [
      {
        // For TypeScript and JavaScript files
        test: /\.(ts|tsx|js|jsx)$/,
        // Exclude node_modules to speed up compilation
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Configuration for Babel (defined in .babelrc or package.json)
            // Example configuration shown below
          },
        },
      },
      // CSS loader rule for handling styles
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // 7. Plugins
  plugins: [
    // Cleans the 'dist' folder before each new build
    new CleanWebpackPlugin(),
  ],

  // 8. Source Maps
  // Generates source maps for easier debugging by the consumer
  devtool: 'source-map',
};