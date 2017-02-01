/**
 * @file karma test common config
 * @author cxtom <cxtom2008@gmail.com>
 */

const path = require('path');

module.exports = {

    basePath: path.join(__dirname, '../../'),

    frameworks: ['jasmine', 'jasmine-expect-jsx'],

    files: [
        './test/**/*.spec.js'
    ],

    browsers: ['Chrome'],

    preprocessors: {
        './test/**/*.spec.js': ['webpack', 'sourcemap'],
        './src/*.js': ['coverage', 'sourcemap']
    },

    webpack: {
        devtool: 'inline-source-map',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                },
                // 处理 stylus
                {
                    test: /\.styl$/,
                    loader: 'style!css!stylus?paths=node_modules&resolve url'
                },
                // 处理 iconfont
                {
                    test: /\.(svg|eot|ttf|woff|woff2)($|\?)/,
                    loader: 'file'
                },
                {
                    test: /\.css$/,
                    loader: 'style!css'
                }
            ]
        },
        // stylus loader 中引入 nib 库支持
        stylus: {
            use: [require('nib')()]
        },
        externals: {
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true
        }
    },

    webpackMiddleware: {
        stats: 'errors-only'
    },

    reporters: ['coverage', 'mocha'],

    coverageReporter: {
        dir: path.join(__dirname, '../../coverage'),
        reporters: [
            // reporters not supporting the `file` property
            {type: 'html'},
            {type: 'lcovonly', subdir: 'lcov'}
        ]
    },

    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true

};
