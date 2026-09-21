import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultConfig,normalizeConfig,assetUrl} from '../../src/features/kaiwu/config.js';
import {en,cn} from '../../src/features/kaiwu/messages.js';
import {errorKey,failure,parseConfig} from '../../src/features/kaiwu/errors.js';

test('Kaiwu assets respect deployment base and remote configuration origin',()=>{
  const base='https://example.test/portfolio/';
  assert.equal(defaultConfig(base).modelPath,base+'kaiwu/model/owl_gltf/1.gltf');
  assert.equal(normalizeConfig({modelPath:'/model/owl_gltf/1.gltf'},base).modelPath,base+'kaiwu/model/owl_gltf/1.gltf');
  assert.equal(normalizeConfig({modelPath:'./owl.gltf',hdrPath:'../env.hdr'},base,'https://cdn.test/art/config.json').modelPath,'https://cdn.test/art/owl.gltf');
  assert.equal(assetUrl('/model.gltf',base,'https://cdn.test/art/config.json'),'https://cdn.test/model.gltf');
  assert.throws(()=>assetUrl('javascript:alert(1)',base));
});

test('Kaiwu configuration rejects invalid camera and unsupported effects explicitly',()=>{
  const base='https://example.test/';
  assert.throws(()=>normalizeConfig({camera:{position:{x:0}}},base));
  assert.throws(()=>normalizeConfig({hdrAngle:20},base));
  assert.throws(()=>normalizeConfig({enablePostprocessing:true},base));
  const first=defaultConfig(base);first.camera.position.x=99;
  assert.equal(defaultConfig(base).camera.position.x,0);
});

test('Kaiwu recovery errors have matching English and Chinese copy',()=>{
  assert.deepEqual(Object.keys(en).sort(),Object.keys(cn).sort());
  assert.deepEqual(Object.keys(en.errors).sort(),Object.keys(cn.errors).sort());
  for(const key of Object.keys(en.errors)){
    assert.ok(en.errors[key] && cn.errors[key]);
    assert.equal(errorKey(failure(key)),'kaiwuViewer.errors.'+key);
  }
  assert.throws(()=>parseConfig('{'),error=>error.code==='json');
});
