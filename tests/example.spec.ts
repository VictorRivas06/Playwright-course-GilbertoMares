import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  //Arrange = prepara mis configuraciones,datos,pagina antes de iniciar el escenario
  await page.goto('https://playwright.dev/');

  //Act = ejecuta acciones de mi prueba
  await page.getByRole('link', { name: 'Get started' }).click();

  //Asset = Validacion de mis resultados esperados
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
