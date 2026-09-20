import test from 'node:test';
import assert from 'node:assert/strict';
import {initialLocale, persistLocale} from '../../src/utils/locale.js';

test('only supported stored locales override the browser preference', () => {
  assert.equal(initialLocale('en-US',() => ({getItem:() => 'zh-CN'})),'zh-CN');
  for(const invalid of [null,'','fr-FR','__proto__','<script>']) {
    assert.equal(initialLocale('zh-HK',() => ({getItem:() => invalid})),'zh-CN');
    assert.equal(initialLocale('fr-FR',() => ({getItem:() => invalid})),'en-US');
  }
});

test('blocked storage reads and writes do not block language selection', () => {
  const denied = () => { throw new Error('Storage denied'); };
  assert.equal(initialLocale('zh-TW',denied),'zh-CN');
  assert.doesNotThrow(() => persistLocale('zh-CN',denied));
  let written;
  persistLocale('zh-CN',() => ({setItem:(key,value) => { written = [key,value]; }}));
  assert.deepEqual(written,['locale','zh-CN']);
  written = null;
  persistLocale('fr-FR',() => ({setItem:() => { written = true; }}));
  assert.equal(written,null);
});
