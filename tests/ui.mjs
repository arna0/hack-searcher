// Browser test against the real server: sign up, create a team, invite someone from People.
import { chromium } from 'playwright';

const base = process.env.APP_URL || 'http://localhost:8080';
const browser = await chromium.launch();
const page = await browser.newPage();
const fail = (msg) => { console.error('FAIL:', msg); process.exit(1); };

await page.goto(base);
await page.getByRole('button', { name: 'Teams' }).first().click();
await page.getByRole('button', { name: 'Create a profile' }).click();
await page.getByPlaceholder('Your name').fill('UI Tester');
await page.getByPlaceholder('Role, e.g. Backend developer').fill('Frontend developer');
await page.getByPlaceholder('Email').fill(`ui${Date.now()}@test.kz`);
await page.getByPlaceholder('Password (8+ characters)').fill('password123');
await page.getByRole('button', { name: 'Create account' }).click();
await page.getByText('Signed in as UI Tester').waitFor({ timeout: 10000 }).catch(() => fail('sign-up did not reach the Teams page'));

await page.getByRole('button', { name: 'New team' }).click();
await page.getByPlaceholder('Team name').fill('UI Test Team');
await page.getByRole('button', { name: 'Create team' }).click();
await page.getByText('Your team').waitFor({ timeout: 10000 }).catch(() => fail('team was not created'));

await page.getByRole('button', { name: 'People' }).first().click();
await page.locator('article', { hasText: 'Daniyar Sadykov' }).getByRole('button', { name: 'Invite to team' }).click();
await page.getByText(/Invited .* to UI Test Team/).waitFor({ timeout: 10000 }).catch(() => fail('invite from People did not go through'));

await page.screenshot({ path: 'ui-test.png', fullPage: true });
console.log('UI test passed: sign-up, team creation and invite work in the browser');
await browser.close();
