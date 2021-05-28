const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let config = {
    // Definindo arquivos de entrada (main)
    entry: {
        main: [
            './app/src/index.js',
            './app/src/scss/app.scss'
        ]
    },
    // Definindo saída de arquivos transpilados
    output: {
        path: path.resolve(__dirname, './static', 'assets', 'js'),
        filename: '[name].js'
    },
    // Module
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
                test: /\.(sa|sc|c)ss$/i,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // fonts
            {
                test: /\.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: "../fonts/"
                        }
                    }
                ]
            },
            // img
            {
                test: /\.(jp(e)?g|png|gif|svg)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "../img/"
                    }
                }
            }
        ]
    },
    devtool: false,
    // Plugins
    plugins: [
        // Removendo erros de Devtools e Map false
        new webpack.SourceMapDevToolPlugin({}),
        // Extraindo e separando arquivo css
        new MiniCssExtractPlugin({
            filename: path.join('..', 'css', 'style.css')
            //filename: ({ chunk }) => `${chunk.name.replace('/js/', '/css/')}.css`,
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
        })
    ],
    optimization: {
        // Minimize for production, uncomment the next line
        // minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
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

