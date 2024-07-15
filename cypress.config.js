import { defineConfig } from 'cypress';

export default defineConfig({
  pageLoadTimeout: 20000,
  defaultCommandTimeout: 5000,
  hideXHR: true,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
