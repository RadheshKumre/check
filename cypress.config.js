const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";
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
    }
  },
};

//const allure = require('allure-cypress/dist/register')

// module.exports = (on, config) => {
//   allure(on, config)
// }




// const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// // import allureWriter from "@shelex/cypress-allure-plugin/writer";
// module.exports = defineConfig({
//     e2e: {
//         setupNodeEvents(on, config) {
//             on('file:preprocessor', webpackPreprocessor);
//             allureWriter(on, config);
//             return config;
//         },
//         env: {
//             allureReuseAfterSpec: true
//         }
//     }
// });