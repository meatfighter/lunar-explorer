import path from 'path';

export default {
    mode: 'production',
    entry: {
        index: './src/index.ts',
        app: './src/app.ts',
        sw: './src/sw.ts',
        boot: './src/boot.ts',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(process.cwd(), 'public_html/scripts'),
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