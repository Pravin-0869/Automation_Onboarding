import { defineConfig } from '@playwright/test';

import { appConfig } from './config/app.config';
import { projectConfig } from './config/project.config';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 120000,
  expect: {
    timeout: 15000
  },
  reporter: [['html'], ['list']],
  use: {
    headless: false,
    baseURL: appConfig.baseUrl,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: appConfig.actionTimeout
  },
  projects: projectConfig
});