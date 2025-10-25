// Simple Karma configuration for CI/CD
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-jsdom-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: false,
        stopOnSpecFailure: false,
        failFast: false
      }
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'text-summary' },
        { type: 'lcov' }
      ]
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    browsers: ['jsdom'],
    singleRun: true,
    restartOnFileChange: false,
    captureTimeout: 30000,
    browserDisconnectTimeout: 5000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 30000,
    retryLimit: 1
  });
};
