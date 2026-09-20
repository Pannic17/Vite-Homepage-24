import {test} from 'node:test';
import assert from 'node:assert/strict';
import {publicAsset} from '../../src/utils/publicAsset.js';

test('public assets resolve at root and project base independently of the active route', () => {
  for(const base of ['/','/Vite-Homepage-24/']) {
    for(const path of ['image/a.png','/image/a.png','./image/a.png','/./image/a.png']) assert.equal(publicAsset(path,base),base+'image/a.png');
    assert.equal(publicAsset(base+'image/a.png',base),base+'image/a.png');
    assert.equal(publicAsset('',base),'');
    for(const path of ['https://example.com/a.png','//example.com/a.png','data:image/png;base64,abc']) assert.equal(publicAsset(path,base),path);
  }
});
