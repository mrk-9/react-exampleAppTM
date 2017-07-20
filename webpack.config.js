var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        index: './public/js/index.js'
    },
    output: {
        path: 'public/js/dist',
        filename: '[name].js',
        publicPath: '/js/dist/'
    },
    resolve: {
        root: [
            path.resolve('public'),
            path.resolve('public/js'),
            path.resolve('public/components')
        ],
        modulesDirectories: [
            'components',
            'node_modules',
            'templates'
        ],
        alias: {
            jquery: 'jquery/dist/jquery.js',
            backbone: 'backbone/backbone.js',
            underscore: 'lodash/dist/lodash.compat.js',
            'backbone.marionette': 'marionette/lib/core/backbone.marionette.js',
            'backbone.hammerjs': 'backbone.hammer.js/backbone.hammer.js',
            'hammerjs' : 'jquery-hammerjs/jquery.hammer-full.js',
            'dustjs-linkedin': 'dustjs-linkedin/dist/dust-core.js',
            'dustjs-helpers': 'dustjs-helpers/dist/dust-helpers.js',
            velocity: 'velocity/jquery.velocity.js',
            transition: 'bootstrap/js/transition',
            collapse: 'bootstrap/js/collapse'
        },
        extensions: ['', '.js', '.json']
    },
    module: {
        loaders: [
            {
                test: /jquery\.js$/,
                loader: "expose?jQuery!expose?$"
            }
        ]
    },
    stats: {
        colors: true,
        reasons: true
    },
    progress: true,
    keepalive: true,
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            dust: 'dustjs-linkedin',
            _: 'underscore',
            Backbone: 'backbone',
            Marionette: 'backbone.marionette'
        }),
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ],
    debug: false,
    watch: true,
    devtool: "#inline-source-map"
};