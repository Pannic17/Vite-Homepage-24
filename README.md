# Vue 3 + Vite

https://pannic17.github.io/Vite-Homepage-24/

## Development

### Windows quick start

Double-click `start-local.cmd` to start the local development server and open
the site in your browser. Keep the terminal window open while using the site;
press `Ctrl+C` or close the window to stop it. You can also create a desktop
shortcut to this file.

The launcher uses a compatible Node.js from PATH, or the local Codex bundled
runtime when available. Missing dependencies are installed automatically with
`npm ci` (internet access required on first launch).

### Command line

Requires Node.js `>=22.19.0` (Node.js 24 LTS recommended). The baseline
measurement tools require this newer runtime even though Vite itself supports
some older Node.js releases.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

The deployment base path is `/Vite-Homepage-24/`.

## Stability and static deployment

Phase 1 is complete. See the [delivery report](docs/phase1/2026-09-18/README.md)
for lifecycle, navigation, fallback, and deployment test evidence.

Production builds generate an `index.html` for every known route and a
`404.html`. Publish the entire fresh build output, including those route
directories and assets. Do not publish only the root HTML or reuse the old
tracked `dist/` contents. The current changes have not been deployed.

For a root-path deployment, build with this PowerShell command:

```powershell
$env:VITE_BASE_PATH = '/'
npm run build
Remove-Item Env:VITE_BASE_PATH
```

With the variable unset, builds use the GitHub Pages project path above.
Known deep links work through physical route directories; unknown routes
render the app's 404 page with a 404 HTTP status on the tested static server.
GitHub Pages publishing settings still need verification before deployment.

```sh
npm run test:unit
npm run test:e2e
npm run test:static
```

The current end-to-end suite has 53 passing cases and two expected failures
(language persistence, one per viewport). Eleven duplicate matrix cases are
intentionally skipped in the mobile project: the desktop project explicitly
checks all eleven viewport sizes. Static-host checks cover both base paths
without an SPA rewrite. Run browser commands sequentially.

## Responsive layout

Phase 2 introduces shared page headers, responsive project cards, bounded
typography, keyboard navigation, and a dedicated home scene area. See the
[phase 2 report](docs/phase2/2026-09-20/README.md) for screenshots and the test
matrix. Tokens live in `src/styles/tokens.css`; page content remains in the
existing views until phase 3.

For live scene screenshots and long-title/URL stress checks:

```sh
node scripts/capture-phase2.mjs
```

The default output is `phase2-latest.local/`. This uses the same preview port
as the other browser checks, so run it separately. Automated viewport and
200% text checks do not replace Safari, physical-device, or native browser
zoom verification.

## Refactoring baseline

See [Roadmap](Roadmap.md) and the [phase 0 baseline report](docs/baseline/2026-09-18/README.md) for known issues, screenshots, measurements, and reproduction details.

```sh
npm ci
npx playwright install chromium
npm run test:e2e
npm run baseline:capture
npm run baseline:lighthouse
```

Run these browser commands sequentially. Tests build into `.baseline-dist/`
and use port 4175 without modifying the tracked `dist/` files. New captures go
to `baseline-latest.local/`; archived evidence is under `docs/baseline/`.
The suite includes explicitly marked expected failures for existing defects.
Use `npm run test:smoke` for the normal smoke checks only.

If the bundled browser download is unavailable, set `PLAYWRIGHT_CHANNEL=chrome`
or `msedge` for Playwright, and `CHROME_PATH` to the corresponding executable
for Lighthouse. Record the installed browser version alongside results.
