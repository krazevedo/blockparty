import { defineConfig } from 'cypress';

export default defineConfig({
  pageLoadTimeout: 5000,
  defaultCommandTimeout: 2000,
  hideXHR: true,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
