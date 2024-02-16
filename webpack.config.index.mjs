import path from 'path';

export default {
    mode: 'production',
    entry: {
        index: './src/index.ts',
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(process.cwd(), 'public_html'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                jszip: {
                    test: /[\\/]node_modules[\\/]jszip[\\/]/,
                    name: 'jszip',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};