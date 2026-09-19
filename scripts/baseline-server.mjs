import { build, preview } from 'vite';

export async function startBaselineServer() {
  await build({ build: { outDir: '.baseline-dist' } });
  const server = await preview({
    build: { outDir: '.baseline-dist' },
    preview: { host: '127.0.0.1', port: 4175, strictPort: true, open: false },
  });
  return { server, url: 'http://127.0.0.1:4175/Vite-Homepage-24/' };
}

if (process.argv[1]?.replaceAll('\\', '/').endsWith('/baseline-server.mjs')) {
  const { url } = await startBaselineServer();
  console.log(`Baseline preview: ${url}`);
}
