import {execFileSync,spawnSync} from 'node:child_process';
import {mkdir,mkdtemp,copyFile,writeFile,stat} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';

const npm = process.env.npm_execpath;
if (!npm) throw new Error('Run through npm run verify:clean so the active npm CLI is explicit.');
const root = process.cwd();
const output = resolve(process.argv[2] || 'phase5-latest.local');
await mkdir(output,{recursive:true});
const parent=join(root,'.clean-install.local');
await mkdir(parent,{recursive:true});
const checkout=await mkdtemp(join(parent,'run-'));
const files=[...new Set(execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(Boolean))];
let copied=0;
for(const file of files) {
  // Deliberately prove that old tracked build artifacts are not needed.
  if(file.startsWith('dist/')) continue;
  const source=join(root,file);
  if(!(await stat(source).catch(()=>null))?.isFile()) continue;
  const target=join(checkout,file);
  await mkdir(dirname(target),{recursive:true});
  await copyFile(source,target);
  copied++;
}
const result={capturedAt:new Date().toISOString(),node:process.version,platform:process.platform,checkout,copiedFiles:copied,steps:[]};
for(const [name,args] of [['install',[npm,'ci']],['check',[npm,'run','check']],['development',['scripts/verify-development.mjs']]]) {
  const started=Date.now();
  const run=spawnSync(process.execPath,args,{cwd:checkout,encoding:'utf8',windowsHide:true,timeout:180000,maxBuffer:20*1024*1024});
  await writeFile(join(output,`clean-${name}.log`),(run.stdout || '')+(run.stderr || ''));
  result.steps.push({name,exitCode:run.status,elapsedMs:Date.now()-started,error:run.error?.message});
  await writeFile(join(output,'clean-install.json'),JSON.stringify(result,null,2));
  console.log(`${name}: exit ${run.status}, ${Date.now()-started}ms`);
  if(run.status!==0) throw new Error(`Clean ${name} failed; see ${output}`);
}
console.log('Isolated clean installation, checks, production build and development browser checks passed.');
