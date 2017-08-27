let webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['jquery', 'vue']
    },
    output: {
        path: __dirname + '/../public/',
        filename: '[name].js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            Popper: ['popper.js', 'default']
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js',
            'vuex$': 'vuex/dist/vuex.min.js',
            'jquery$': 'jquery/dist/jquery.min.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false,
                    loaders: {
                        css: 'style-loader!css-loader?importLoaders=1!stylus-loader'
                    },
                    postcss: {
                        plugins: [
                            require('autoprefixer')({
                                browsers: ['last 3 versions']
                            })
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test:   /\.styl/,
                loaders: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: 8082
    }
};