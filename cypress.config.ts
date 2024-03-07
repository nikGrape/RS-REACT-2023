/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';
import coverage from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.baseUrl = 'http://localhost:3010';
      config.video = false;
      coverage(on, config);
      return config;
    },
    video: false,
    baseUrl: 'http://localhost:3010',
  },
});
