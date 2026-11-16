// The GitHub Pages demo (API running in the browser): two accounts, invite and accept.
import { chromium } from 'playwright';

const base = process.env.DEMO_URL || 'http://localhost:4173';
const browser = await chromium.launch();
const page = await browser.newPage();
const fail = (msg) => { console.error('FAIL:', msg); process.exit(1); };
const wait = (text, msg) => page.getByText(text).first().waitFor({ timeout: 10000 }).catch(() => fail(msg));

async function signInAs(name) {
  await page.getByRole('button', { name: 'Teams' }).first().click();
  await page.locator('li').getByRole('button', { name }).click();
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await wait(`Signed in as ${name}`, `could not sign in as ${name}`);
}

await page.goto(base);
await signInAs('Arnur');
await page.getByRole('button', { name: 'People' }).first().click();
await page.locator('article', { hasText: 'Daniyar Sadykov' }).getByRole('button', { name: 'Invite to team' }).click();
await wait(/Invited Daniyar Sadykov to City Pulse/, 'invite was not sent');

await page.getByRole('button', { name: 'Teams' }).first().click();
await page.getByTitle('Sign out').click();
await signInAs('Daniyar Sadykov');
await wait('Arnur', 'Daniyar does not see the invite');
await page.getByRole('button', { name: 'Accept' }).click();
await wait("You're in this team", 'accepting did not add Daniyar to the team');

await page.reload();
await page.getByRole('button', { name: 'Teams' }).first().click();
await wait("You're in this team", 'data was not kept after reload');

await page.screenshot({ path: 'demo-test.png', fullPage: true });
console.log('Demo test passed: invite, switch account, accept, data kept after reload');
await browser.close();
