const webpackConfig = require('../../webpack.config')

module.exports = (config) => {
  config.set({
    basePath: '../../',
    files: [
      'test/config/MochaGlobals.js',
      'test/specs/unit/**/*.spec.js'
    ],
    preprocessors: {
      'test/config/MochaGlobals.js': ['webpack'],
      'test/specs/unit/**/*.spec.js': ['webpack']
    },
    exclude: [],
    frameworks: [
      'mocha',
      'chai',
      'sinon',
      'chai-sinon',
      'source-map-support'
    ],
    plugins: [
      'karma-*'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['dots', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      dir: 'test/results',
      reports: ['lcov', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    client: {
      captureConsole: false
    },
    browsers: ['PhantomJS'],
    autoWatch: true,
    singleRun: true
  })
}
