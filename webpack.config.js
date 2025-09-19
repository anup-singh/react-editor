const path = require('path');
const nodeExternals = require('webpack-node-externals');

const createConfig = (moduleType) => {
  const isESM = moduleType === 'esm';

  return {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, `dist/${moduleType}`),
      filename: 'index.js',
      library: {
        type: isESM ? 'module' : 'commonjs2',
      },
      clean: true,
    },
    experiments: {
      outputModule: isESM,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              }
            }
          ]
        },
        {
          test: /\.css$/,
          // Use 'style-loader' to inject CSS into the DOM at runtime.
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]',
          },
        },
      ],
    },
    // Keep 'externals' but make an exception for CSS files and other assets
    externals: [nodeExternals({
      allowlist: [/\.css$/],
    })],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
  };
};

module.exports = [
  createConfig('esm'),
  createConfig('cjs'),
];