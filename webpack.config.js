const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
    // Definindo arquivos de entrada (main)
    entry: {
        main: [
            './app/src/index.js',
            './app/src/scss/app.scss'
        ]
    },
    // Definindo saída de arquivos compilados
    output: {
        path: path.resolve(__dirname, 'static', 'assets', 'js'),
        filename: '[name].bundle.js'
    },
    devtool: false,
    plugins: [
        // Extraindo e separando arquivo css
        new MiniCssExtractPlugin({
            filename: path.join('..', 'css', 'app.css')
        }),
        // Se o aplicativo react está se conectando a uma API,
        // então é bom passar Endpoints estáticos via webpack
        // ou quaisquer outras variáveis ​​estáticas como a versão da API que o aplicativo usará
        new webpack.DefinePlugin({
            '__DEV__': JSON.stringify(true),
            '__API_HOST__': JSON.stringify('http://localhost/php-react-app/'),
        }),
        // Se usar jQuery no projeto
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // // Removendo erros de Devtools e Map false
        new webpack.SourceMapDevToolPlugin({})
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            // js
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'babel-loader'
                },
            },
            // scss e css
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'babel-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            // css
            {
                test: /\.css$/i,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    'babel-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // img fonts
            {
                test: /.(jpeg?g|png|gif|svg|woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../css/[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    //  Importando a variável global MyApp para nosso aplicativo ReactJs
    externals: {
        myApp: 'myApp',
    }
};
module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.watch = true;
    }
    return config;
};

