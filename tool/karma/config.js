/**
 * @file karma test common config
 * @author cxtom <cxtom2008@gmail.com>
 */

var path = require('path');

var NODE_MODULES_FILES = '**/node_modules/**';

var babelOpts = {
    presets: ['es2015', 'es2015-loose', 'react', 'stage-1'],
    plugins: [
        'transform-es3-property-literals',
        'transform-es3-member-expression-literals'
    ],
    ignore: [NODE_MODULES_FILES]
};


module.exports = {

    basePath: path.join(__dirname, '../../'),

    frameworks: ['browserify', 'jasmine'],

    files: [
        './node_modules/jasmine-expect-jsx/dist/jasmine-expect-jsx.js', // expect-jsx
        './test/**/*.spec.js',
        './src/css/TimePicker.styl'
    ],

    browsers: ['Chrome'],

    preprocessors: {
        './test/**/*.spec.js': ['browserify'],
        './test/*.js': ['browserify'],
        './src/*.js': ['browserify', 'coverage'],
        './src/css/TimePicker.styl': ['stylus']
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
            'paths': [path.join(__dirname, '../../dep')]
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
