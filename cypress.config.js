const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "viewportHeight": 880,
    "viewportWidth": 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
