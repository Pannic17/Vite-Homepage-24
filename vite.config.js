import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { productionPaths } from './src/routePaths.js'

// Known routes get real HTML entries on static hosts. Unknown routes receive
// the same app shell as a genuine HTTP 404, preserving history-mode URLs.
function staticEntries() {
  return {
    name: 'static-route-entries',
    apply: 'build',
    enforce: 'post',
    generateBundle(options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') throw new Error('Missing index.html');
      for (const path of productionPaths.filter(path => path !== '/')) {
        this.emitFile({ type: 'asset', fileName: path.slice(1) + '/index.html', source: index.source });
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: index.source });
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), staticEntries()],
  base: process.env.VITE_BASE_PATH || '/Vite-Homepage-24/'
})
