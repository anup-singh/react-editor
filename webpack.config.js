const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

/**
 * Factory to generate Webpack configs for ESM and CJS
 * @param {'esm' | 'cjs'} moduleType
 */
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
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name][ext]', // Optional: Customize asset output
                    },
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css', // Outputs index.css
            })
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        externals: [nodeExternals()],
    };
};

module.exports = [
    createConfig('esm'),
    createConfig('cjs'),
];
