'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    plugins: [
        // Extraindo css para não misturar os arquivos css e js incluídos em uma pasta o que seria o caso no código acima
        new ExtractTextPlugin(path.join('..', 'css', 'app.css')),

        // Se o aplicativo react está se conectando a uma API, 
        // então é bom passar Endpoints estáticos via webpack 
        // ou quaisquer outras variáveis ​​estáticas como a versão da API que o aplicativo usará
        new webpack.DefinePlugin({
            '__DEV__': JSON.stringify(true),
            '__API_HOST__': JSON.stringify('http://localhost/php-react-app/'),
        }),
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
            // scss
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            // css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            // img fonts
            {
                test: /.(png|woff(2)?|eot|ttf|svg|gif)(\?[a-z0-9=\.]+)?$/,
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

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                sequences: true,
                conditionals: true,
                booleans: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            output: {
                comments: false
            },
            minimize: true
        })
    );
}

module.exports = config;
