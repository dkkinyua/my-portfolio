// Minimal .env loader for local tooling (setupProxy + spotify-auth).
// Looks in frontend/.env and the repo-root .env; real environment variables win.
// Production reads env vars set in the Vercel dashboard instead.

const fs = require('fs')
const path = require('path')

const ENV_FILES = [
  path.join(__dirname, '..', '.env'),
  path.join(__dirname, '..', '..', '.env'),
]

const LINE = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/

function parse(file) {
  const vars = {}
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(LINE)
    if (!match) continue
    vars[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2')
  }
  return vars
}

function loadEnv() {
  for (const file of ENV_FILES.filter(fs.existsSync)) {
    for (const [key, value] of Object.entries(parse(file))) {
      if (!(key in process.env)) process.env[key] = value
    }
  }
}

// The .env file that defines `key`, so a new value can be written back beside it.
function envFileDefining(key) {
  return ENV_FILES.find((file) => fs.existsSync(file) && key in parse(file))
}

module.exports = { loadEnv, envFileDefining }
