param(
    [switch]$Check,
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'

try {
    $projectRoot = Split-Path -Parent $PSScriptRoot
    Set-Location -LiteralPath $projectRoot

    $systemNode = Get-Command node.exe -ErrorAction SilentlyContinue
    $bundledNode = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
    $candidates = @()
    if ($systemNode) { $candidates += $systemNode.Source }
    $candidates += $bundledNode

    $nodePath = $null
    foreach ($candidate in $candidates) {
        if (-not (Test-Path -LiteralPath $candidate)) { continue }
        $versionText = & $candidate --version
        if ($LASTEXITCODE -ne 0 -or $versionText -notmatch '^v(\d+)\.(\d+)\.(\d+)$') { continue }
        $major = [int]$Matches[1]
        $minor = [int]$Matches[2]
        if (($major -eq 22 -and $minor -ge 19) -or $major -gt 22) {
            $nodePath = $candidate
            break
        }
    }
    if (-not $nodePath) {
        throw 'Compatible Node.js not found. Install Node.js 24 LTS from https://nodejs.org/ and try again.'
    }

    $env:Path = (Split-Path -Parent $nodePath) + ';' + $env:Path
    Write-Host "Node: $nodePath"
    & $nodePath --version
    $viteEntry = Join-Path $projectRoot 'node_modules\vite\bin\vite.js'

    if ($Check) {
        if (-not (Test-Path -LiteralPath $viteEntry)) {
            Write-Host 'Dependencies will be installed on first launch.'
        }
        Write-Host 'Local launcher is ready.'
        exit 0
    }

    if (-not (Test-Path -LiteralPath $viteEntry)) {
        $npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
        if (-not $npmCommand) { throw 'npm not found. Install Node.js 24 LTS and try again.' }
        $npmEntry = Join-Path (Split-Path -Parent $npmCommand.Source) 'node_modules\npm\bin\npm-cli.js'
        if (-not (Test-Path -LiteralPath $npmEntry)) { throw "npm CLI not found: $npmEntry" }
        Write-Host 'Installing project dependencies...'
        & $nodePath $npmEntry ci
        if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed. Check the output above and try again.' }
    }

    Write-Host 'Starting local server. Press Ctrl+C or close this window to stop.'
    $viteArguments = @('--host', '127.0.0.1')
    if (-not $NoBrowser) { $viteArguments += '--open' }
    & $nodePath $viteEntry @viteArguments
    exit $LASTEXITCODE
} catch {
    Write-Host "Launch failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
