import { spawn } from 'node:child_process'

for (const engine of ['firefox', 'webkit']) {
  const child = spawn(
    process.execPath,
    [
      'scripts/browser-smoke.mjs',
      '--suite=compatibility',
      `--engine=${engine}`,
      ...process.argv.slice(2),
    ],
    { stdio: 'inherit', windowsHide: true },
  )
  const code = await new Promise((resolve, reject) => {
    child.once('error', reject)
    child.once('exit', resolve)
  })
  if (code !== 0) process.exit(code ?? 1)
}
