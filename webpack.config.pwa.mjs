import path from 'path';

export default {
    mode: 'production',
    entry: {
        pwa: './src/pwa.ts',
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(process.cwd(), 'public_html/pwa/scripts'),
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