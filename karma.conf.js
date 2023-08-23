module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-spec-reporter'),
    ],
    client: {
      jasmine: {},
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    browsers:['Chrome'],
    // browsers: ['ChromeHeadLessNoSandbox'],
    // customLaunchers: {
    //   ChromeHeadLessNoSandbox: {
    //     base: 'ChromiumHeadless',
    //     flags: [
    //       '--disable-gpu',
    //       '--no-sandbox',
    //       '--disable-web-security',
    //     ]
    //   }
    // },
    coverageReporter: {
      // dir: require('path').join(__dirname, './coverage/supersurvey'),
      dir: require('path').join(__dirname, './coverage/'),
      subdir: '.',
      reporters: [
        { type: 'text-summary' },
        { type: 'lcov' }
      ]
    },
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      supressFailed: false,
      supressPassed: false,
      supressSkipped: false,
      showSpecTiming: true,
      failFast: false,
    },
    reporters: ['progress', 'kjhtml', 'spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: false,
    browserDisconnectTimeout: 160000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 160000,
    browserSocketTimeout: 16000,
    retryLimit: 4,
    pingTimeout: 60000,
    jasmineNodeOpts:{
      showColors: true,
      includeStackTrace:true,
      defaultTimeoutInterval:160000
    }
  });
};
