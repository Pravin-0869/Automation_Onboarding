import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    fullyParallel: false,

    workers: 1,

    retries: 0,

    reporter: 'html',

    use: {
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry'
    },

    projects: [

        {
            name: 'Chrome-NewAgent',

            use: {
                ...devices['Desktop Chrome'],
                browserName: 'chromium'
            }
        },

        {
            name: 'Firefox-Composite',

            use: {
                ...devices['Desktop Firefox'],
                browserName: 'firefox'
            }
        },   
        {
            name: 'Edge-Transfer',

            use: {
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
                channel: 'msedge'
            }
        }
    ]
});