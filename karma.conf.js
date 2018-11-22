// Karma configuration
// Generated on Wed Nov 21 2018 21:14:08 GMT+0800 (中国标准时间)
// var webpack = require('webpack');
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'chai-sinon'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.test.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],

    client: {
      mocha: {
        timeout : 3000 // mocha异步最长等待时间
      }
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.test.js': ['webpack','coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    /**
     * 日志等级
     * config.LOG_DISABLE //不输出信息
     * config.LOG_ERROR  //只输出错误信息
     * config.LOG_WARN //只输出警告信息
     * config.LOG_INFO //输出全部信息
     * config.LOG_DEBUG //输出调试信息
     */
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: "babel-loader",
          },
          // {
          //   test: /\.css$/,
          //   use: [
          //     'style-loader',
          //     'css-loader'
          //   ]
          // },
          // {
          //   test: /\.(png|svg|jpg|gif)$/,
          //   use: [
          //     'file-loader'
          //   ]
          // }
        ]
      },
    },

    webpackMiddleware: {
      noInfo: true
    }
  })
}
