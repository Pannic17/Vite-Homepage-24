import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {gzipSync} from 'node:zlib';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {disposeObject3D} from '../src/three/dispose.js';
import assert from 'node:assert/strict';

const output = resolve(process.argv[2] || 'phase4-latest.local');
await mkdir(output,{recursive:true});
const original = await readFile('public/cat.gltf');
const document = JSON.parse(original);
assert.equal(document.buffers.length,1);
const binary = Buffer.from(document.buffers[0].uri.split(',')[1],'base64');
delete document.buffers[0].uri;
const json = Buffer.from(JSON.stringify(document));
const paddedJson = Buffer.alloc(Math.ceil(json.length / 4) * 4,32);
json.copy(paddedJson);
const paddedBin = Buffer.alloc(Math.ceil(binary.length / 4) * 4);
binary.copy(paddedBin);
const glb = Buffer.alloc(12 + 8 + paddedJson.length + 8 + paddedBin.length);
glb.writeUInt32LE(0x46546c67,0); glb.writeUInt32LE(2,4); glb.writeUInt32LE(glb.length,8);
glb.writeUInt32LE(paddedJson.length,12); glb.writeUInt32LE(0x4e4f534a,16); paddedJson.copy(glb,20);
const offset=20+paddedJson.length;
glb.writeUInt32LE(paddedBin.length,offset); glb.writeUInt32LE(0x004e4942,offset+4); paddedBin.copy(glb,offset+8);

// This Node-only adapter allows FileLoader's progress event for a data URI.
globalThis.ProgressEvent ??= class ProgressEvent extends Event {constructor(type,options) {super(type); Object.assign(this,options);}};
const snapshot = root => {
  const geometry=[];
  root.traverse(node => {if (node.isMesh) geometry.push({
    matrix:node.matrix.toArray(),
    attributes:Object.fromEntries(Object.entries(node.geometry.attributes).map(([key,value])=>[key,Buffer.from(value.array.buffer,value.array.byteOffset,value.array.byteLength).toString('base64')])),
    indices:Buffer.from(node.geometry.index.array.buffer).toString('base64'),
  });});
  return geometry;
};
const report={node:process.version,conditions:'Five alternating cold loader parses per format in Node on the same host; not a browser/GPU or physical mobile benchmark.',runs:[],original:{bytes:original.length,gzip:gzipSync(original).length},candidate:{bytes:glb.length,gzip:gzipSync(glb).length},adopted:false};
let expected;
for(let run=0;run<5;run++) for(const [format,buffer] of [['gltf',original],['glb',glb]]) {
  const start=performance.now();
  const parsed=await new GLTFLoader().parseAsync(buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength),'');
  report.runs.push({run:run+1,format,parseMs:performance.now()-start});
  const actual=snapshot(parsed.scene);
  if(!expected) expected=actual;
  else assert.deepEqual(actual,expected);
  disposeObject3D(parsed.scene);
}
report.identicalGeometry=true;
report.decision='Keep original GLTF in production. Lossless GLB has identical vertex/index data; gzip gain is reported below. Physical-device decode and rendered-image validation remain unverified; no Draco/meshopt decoder or lossy geometry changes introduced.';
report.medianParseMs=Object.fromEntries(['gltf','glb'].map(format=>[format,report.runs.filter(run=>run.format===format).map(run=>run.parseMs).sort((a,b)=>a-b)[2]]));
await writeFile(join(output,'model-evaluation.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
