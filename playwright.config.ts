import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
//  import dotenv from 'dotenv';
//  import path from 'path';
//  dotenv.config({ path: path.resolve(__dirname, '.env') });

import "dotenv/config";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '.',
  testMatch: [/tests\/.*\.spec\.ts/, /module-.*\/.*\.spec\.ts/],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000, //para acciones en general o await
  expect: { timeout: 10_000 }, //para mis validaciones
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: "always" }], //siempre y cuando este abierto el server de reportes se abre automatico mi reporte
    ["list"] //TEST RESULT de Visual Studio me dé más detalle de mis test
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL ?? "https://omnipizza-frontend.onrender.com", // el ?? es para preguntar si existe o si viene vacia
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    navigationTimeout: 45_000, //tiempo de carga entre una pagina y otra
    headless: process.env.HEADLESS === "true" ? true : false, //Por default ya viene como True
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },

    {
      name: "chromium",
      use: { ...devices['Desktop Chrome'], storageState: ".auth/user.json" },
      dependencies: ["setup"],
      testMatch: [/tests\/.*\.spec\.ts/]
    },

    /*
   {
     name: 'chromium',
     use: { ...devices['Desktop Chrome'] },
   },

   {
     name: 'firefox',
     use: { ...devices['Desktop Firefox'] },
   },

   {
     name: 'webkit',
     use: { ...devices['Desktop Safari'] },
   },

   /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
