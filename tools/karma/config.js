/**
 * @file karma test common config
 * @author cxtom <cxtom2008@gmail.com>
 */

const path = require('path');
const babelOptions = require('../../package.json').babel;

babelOptions.plugins.push('istanbul');

module.exports = {

    basePath: path.join(__dirname, '../../'),

    frameworks: ['jasmine'],

    files: [
        './node_modules/jasmine-expect-jsx/dist/jasmine-expect-jsx.js', // expect-jsx
        './test/**/*.spec.js',
        './src/index.styl'
    ],

    browsers: ['Chrome'],

    preprocessors: {
        './test/**/*.spec.js': ['webpack'],
        './src/*.js': ['coverage'],
        './src/index.styl': ['webpack']
    },

    webpack: {
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: babelOptions
                },
                // 处理 stylus
                {
                    test: /\.styl$/,
                    loader: 'style!css!stylus?paths=node_modules&resolve url'
                },
                // 处理 iconfont
                {
                    test: /\.(svg|eot|ttf|woff)($|\?)/,
                    loader: 'file'
                }
            ]
        },
        // stylus loader 中引入 nib 库支持
        stylus: {
            use: [require('nib')()]
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
