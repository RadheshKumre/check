const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { defineConfig } = require("cypress");

module.exports = {
  projectId: 'h8rm7m',
  e2e: {
      setupNodeEvents(on, config) {
        // on('file:preprocessor', webpackPreprocessor);
            allureWriter(on, config);
            return config;
          },
        env: {
                allureReuseAfterSpec: true
    },
    env: {
      snapshotOnly: true
    }
  },
};


// import allureWriter from "@shelex/cypress-allure-plugin/writer";
// module.exports = {
//   projectId: 'h8rm7m',
//   e2e: {
//     reporter: 'cypress-mochawesome-reporter',
//       setupNodeEvents(on, config) {
//         require('cypress-mochawesome-reporter/plugin')(on);
//         // on('file:preprocessor', webpackPreprocessor);
//             // allureWriter(on, config);
//             return config;
//           },
//         env: {
//                 allureReuseAfterSpec: true
//     }
//   },
//   e2e:{
//     "watchForFileChanges": false,
//     "reporter":"mochawesome",
//     "reporterOptions":{
//         //"generate":true,
//         "charts":true,
//         "overwrite":false,
//         "html":true,
//         "json":true,
//         "code":false,
//         "reportDir":"D:\allurepoc\report"
//     }
//   },
// };
////reportermochaawesome

// const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter',
//   reporterOptions: {
//     charts: true,
//     reportPageTitle: 'custom-title',
//     embeddedScreenshots: true,
//     inlineAssets: true,
//     saveAllAttempts: false,
//   },
//   e2e: {
//     setupNodeEvents(on, config) {
//       require('cypress-mochawesome-reporter/plugin')(on);
//     },
//   },
// }


// };