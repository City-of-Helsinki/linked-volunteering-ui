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
    await expect(
      page.getByRole('heading', { name: 'Ilmoita uusi puistotalkoo' })
    ).toBeVisible();
  });

  test('Fill & submit', async () => {
    await page.locator('div.leaflet-touch-drag').click();

    await page
      .getByPlaceholder('Tapahtuman nimi')
      .fill('Puistotalkoot e2e testi');

    await page.getByLabel('Kuvausteksti (vapaaehtoinen').fill('Puistotalkoot');

    await page.getByPlaceholder('Osallistujamäärä').fill('1');

    await page.getByPlaceholder('Talkooalue').fill('Karhupuisto');

    // Wait for the address to be populated from the map click before searching
    // The map click triggers an API call that auto-fills the address field
    await expect(page.getByPlaceholder('Etsi osoitteella')).not.toBeEmpty();

    // Now clear and fill with the desired address. Use pressSequentially to
    // reliably trigger react-autosuggest's onChange across all browsers.
    await page.getByPlaceholder('Etsi osoitteella').clear();
    await page
      .getByPlaceholder('Etsi osoitteella')
      .pressSequentially('Työpajankatu 8', { delay: 50 });

    // Wait for and click on the suggestion from the dropdown
    const suggestion = page
      .locator('.react-autosuggest__suggestion')
      .filter({ hasText: 'Työpajankatu 8' })
      .first();

    await expect(suggestion).toBeVisible({ timeout: 30000 });
    await suggestion.click();

    await page
      .getByPlaceholder('Lisätietoja tarvikkeiden toimittamiseen')
      .fill('Työpajankatu 8');

    const testDate = new Date();
    const testYear = testDate.getFullYear() + 1;
    const testNextYear = testYear + 1;

    await page.getByLabel('Tapahtuma alkaa').fill(`15.06.${testYear}`);

    await page.getByLabel('Alkamisaika').click();
    await page.getByRole('option', { name: '11.00' }).click();

    await page.getByLabel('Tapahtuma päättyy').fill(`15.05.${testNextYear}`);

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

    await expect(
      page.getByText('Kiitos tapahtuman ilmoittamisesta!')
    ).toBeVisible({
      timeout: 10000,
    });
  });
});
