import { devices } from '@playwright/test';

export const projectConfig = [
  {
    name: 'Chrome-NewAgent',
    use: {
      ...devices['Desktop Chrome'],
      browserName: 'chromium',
      viewport: {
        width: 1920,
        height: 1080
      },
      launchOptions: {
        args: ['--window-size=1920,1080']
      }
    }
  },
  {
    name: 'Firefox-Composite',
    use: {
      ...devices['Desktop Firefox'],
      browserName: 'firefox',
      viewport: {
        width: 1920,
        height: 1080
      },
      launchOptions: {
        args: ['--width=1920', '--height=1080']
      }
    }
  },
  {
    name: 'Edge-Transfer',
    use: {
      ...devices['Desktop Chrome'],
      browserName: 'chromium',
      channel: 'msedge',
      viewport: {
        width: 1920,
        height: 1080
      },
      launchOptions: {
        args: ['--window-size=1920,1080']
      }
    }
  }
] as const;
