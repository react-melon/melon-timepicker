/**
 * @file karma test common config
 * @author cxtom <cxtom2008@gmail.com>
 */

var path = require('path');

var NODE_MODULES_FILES = '**/node_modules/**';

var babelOpts = require('../../package.json').babel;

module.exports = {

    basePath: path.join(__dirname, '../../'),

    frameworks: ['browserify', 'jasmine'],

    files: [
        './node_modules/jasmine-expect-jsx/dist/jasmine-expect-jsx.js', // expect-jsx
        './test/**/*.spec.js',
        './src/index.styl'
    ],

    browsers: ['Chrome'],

    preprocessors: {
        './test/**/*.spec.js': ['browserify'],
        './test/*.js': ['browserify'],
        './src/*.js': ['browserify', 'coverage'],
        './src/index.styl': ['stylus']
    },

    browserify: {
        debug: true,
        paths: ['./src/*.js', './test/**/**.spec.js'],

        transform: [

            ['babelify', babelOpts],

            ['browserify-istanbul', {
                instrumenter: require('babel-istanbul'),
                instrumenterConfig: {
                    babel: babelOpts
                },
                ignore: [NODE_MODULES_FILES]
            }]
        ],
        extensions: ['.js']
    },

    stylusPreprocessor: {
        options: {
            'use': require('nib')(),
            'resolve url': true,
            'resolve url nocheck': true,
            'paths': [path.join(__dirname, '../../node_modules')]
        }
    },

    // logLevel: config.LOG_DEBUG,
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
