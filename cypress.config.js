import { defineConfig } from 'cypress';

export default defineConfig({
  pageLoadTimeout: 20000,
  defaultCommandTimeout: 5000,
  hideXHR: true,
  video: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Blockparty Cypress Test',
    reportsDir: 'cypress/reports/',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'http://localhost:3000/',
  },
});
