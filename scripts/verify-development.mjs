import {createServer} from 'vite';
import {chromium, expect} from '@playwright/test';
import {mkdir, writeFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';

const output = resolve(process.argv[2] || 'phase3-latest.local');
await mkdir(output,{recursive:true});
const server = await createServer({server:{host:'127.0.0.1',port:4176,strictPort:true,open:false}});
let browser;
try {
  await server.listen();
  browser = await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL || undefined});
  const page = await browser.newPage({locale:'en-US'});
  const errors=[];
  page.on('pageerror',error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4176' + server.config.base);
  await page.getByRole('link',{name:'TEST',exact:true}).click();
  await expect(page.getByRole('heading',{name:'TEST',exact:true})).toBeVisible();
  await expect(page).toHaveTitle('TEST | PANNIC');
  await page.getByRole('button',{name:'中文',exact:true}).click();
  await page.reload();
  await expect(page.getByRole('heading',{name:'测试',exact:true})).toBeVisible();
  await expect(page).toHaveTitle('测试 | PANNIC');
  await expect(page.locator('html')).toHaveAttribute('lang','zh-CN');
  expect(errors).toEqual([]);
  await writeFile(join(output,'development.json'),JSON.stringify({checkedAt:new Date().toISOString(),browser:browser.version(),testEntry:true,testRoute:true,localeAfterReload:'zh-CN',errors},null,2));
} finally {
  await browser?.close();
  await server.close();
}
