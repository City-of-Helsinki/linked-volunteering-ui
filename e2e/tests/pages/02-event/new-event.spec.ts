import { Page, test, expect } from '@playwright/test';

test.describe('New event', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto('/fi/event/new');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Don't submit invalid form", async () => {
    await page.getByRole('button', { name: 'Lähetä hyväksyttäväksi' }).click();

    await expect(page.locator('.invalid-feedback').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ilmoita uusi puistotalkoo' })).toBeVisible();
  });

  test('Fill & submit', async () => {
    await page.locator('div.leaflet-touch-drag').click();

    await page.getByPlaceholder('Tapahtuman nimi').fill('Puistotalkoot e2e testi');

    await page.getByLabel('Kuvausteksti (vapaaehtoinen').fill('Puistotalkoot');

    await page.getByPlaceholder('Osallistujamäärä').fill('1');

    await page.getByPlaceholder('Etsi osoitteella').fill('Työpajankatu 8');

    await page.getByText('Työpajankatu 8').click();

    await page.getByPlaceholder('Sijainti').fill('Työpajankatu 8');

    await page.getByPlaceholder('Talkooalue').fill('1');

    const testDate = new Date();
    const testYear = testDate.getFullYear() + 1;
    const testNextYear = testYear + 1;

    await page.getByLabel('Tapahtuma alkaa').fill(`15.06.${testYear}`);

    await page.getByLabel('Alkamisaika').click();
    await page.getByRole('option', { name: '11.00' }).click();

    await page.getByLabel('Tapahtuma päättyy').fill(`15.06.${testNextYear}`);

    await page.getByLabel('Päättymisaika').click();
    await page.getByRole('option', { name: '11.00' }).click();

    await page.getByPlaceholder('Etunimi').fill('Etunimi');

    await page.getByPlaceholder('Sukunimi').fill('Sukunimi');

    await page.getByPlaceholder('Sähköpostiosoite').fill('test.test@test.com');

    await page.getByPlaceholder('040 123 4567').fill('+35840000000');

    await page.getByLabel('75 litran jätesäkkejä (20 kpl').fill('1');

    await page.getByLabel('30 litran jätesäkkejä (50 kpl').fill('1');

    await page.getByPlaceholder('Roskapihtien määrä').fill('1');

    await page.getByLabel('Lisätiedot (vapaaehtoinen').fill('1');

    await page.getByRole('button', { name: 'Lähetä hyväksyttäväksi' }).click();

    await expect(page.getByText('Kiitos tapahtuman ilmoittamisesta!')).toBeVisible({
      timeout: 10000,
    });
  });
});
