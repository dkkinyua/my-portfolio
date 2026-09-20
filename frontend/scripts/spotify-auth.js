// One-time (and re-authorization) script: gets a Spotify refresh token for your account.
//
//   npm run spotify:auth
//
// Before the first run, in the Spotify developer dashboard, add this Redirect URI to your app:
//   http://127.0.0.1:8888/callback
// (Spotify requires the 127.0.0.1 loopback address, not "localhost".)
// Add it, then click SAVE at the bottom of the settings page. If you registered a different
// address, set SPOTIFY_REDIRECT_URI in .env to that exact value.
//
// "redirect_uri: Not matching configuration" = the URI printed below isn't saved on the app
// whose Client ID this script used. Check the last 4 characters of the Client ID it prints.
//
// The token is written to SPOTIFY_REFRESH_TOKEN in the same .env that holds your client ID.
// It is never printed. Copy it into your Vercel environment variables afterwards and redeploy.

const crypto = require('crypto')
const fs = require('fs')
const http = require('http')
const { exec } = require('child_process')
const { loadEnv, envFileDefining } = require('./loadEnv')

loadEnv()

const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = process.env
if (!clientId || !clientSecret) {
  console.error('Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to your .env first.')
  process.exit(1)
}

// Must match a Redirect URI on your Spotify app character for character. Override with
// SPOTIFY_REDIRECT_URI in .env if you registered a different loopback address.
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:8888/callback'
let redirect
try {
  redirect = new URL(REDIRECT_URI)
} catch {
  console.error(`SPOTIFY_REDIRECT_URI is not a valid URL: ${REDIRECT_URI}`)
  process.exit(1)
}
if (redirect.protocol !== 'http:' || !['127.0.0.1', 'localhost', '[::1]'].includes(redirect.hostname)) {
  console.error(`This script can only listen on a local http address (127.0.0.1, localhost or [::1]). Got: ${REDIRECT_URI}`)
  process.exit(1)
}
const HOST = redirect.hostname.replace(/^\[|\]$/g, '')
const PORT = Number(redirect.port) || 80
const CALLBACK_PATH = redirect.pathname
const SCOPES = 'user-read-currently-playing user-read-recently-played'
const state = crypto.randomBytes(16).toString('hex')

const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    state,
    show_dialog: 'true',
  })

function saveRefreshToken(token) {
  const file = envFileDefining('SPOTIFY_CLIENT_ID')
  const text = fs.readFileSync(file, 'utf8')
  const eol = text.includes('\r\n') ? '\r\n' : '\n'
  const line = `SPOTIFY_REFRESH_TOKEN=${token}`

  const updated = /^\s*SPOTIFY_REFRESH_TOKEN\s*=/m.test(text)
    ? text.replace(/^\s*SPOTIFY_REFRESH_TOKEN\s*=.*$/m, () => line)
    : text.replace(/\s*$/, eol) + line + eol

  fs.writeFileSync(file, updated)
  return file
}

async function exchangeCode(code) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok || !body.refresh_token) {
    throw new Error(`Spotify token exchange failed: ${res.status} ${body.error_description ?? body.error ?? ''}`)
  }
  return body.refresh_token
}

const page = (message) => `<!doctype html><meta charset="utf-8"><title>Spotify</title>
<body style="font-family:system-ui;max-width:32rem;margin:4rem auto;padding:0 1rem"><h2>${message}</h2>
<p>You can close this tab and go back to the terminal.</p></body>`

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI)
  if (url.pathname !== CALLBACK_PATH) return res.writeHead(404).end()

  const fail = (status, message) => {
    res.writeHead(status, { 'Content-Type': 'text/html' }).end(page(message))
    console.error(message)
    server.close(() => process.exit(1))
  }

  if (url.searchParams.get('state') !== state) return fail(400, 'State mismatch, aborting.')
  if (url.searchParams.get('error')) return fail(400, `Spotify said: ${url.searchParams.get('error')}`)

  try {
    const file = saveRefreshToken(await exchangeCode(url.searchParams.get('code')))
    res.writeHead(200, { 'Content-Type': 'text/html' }).end(page('All set — Spotify is connected.'))
    console.log(`\nSaved SPOTIFY_REFRESH_TOKEN to ${file}`)
    console.log('Next: copy that value into your Vercel env vars and redeploy.')
    server.close(() => process.exit(0))
  } catch (err) {
    fail(500, err.message)
  }
})

server.listen(PORT, HOST, () => {
  console.log('Redirect URI being sent to Spotify (must be listed EXACTLY on your app):')
  console.log(`  ${REDIRECT_URI}`)
  console.log(`App used: Client ID ending in "${clientId.slice(-4)}" (must be the app you added the URI to, and you must have clicked Save)`)
  console.log(`\nWaiting for Spotify on ${REDIRECT_URI} ...`)
  console.log(`If the browser doesn't open, visit:\n${authUrl}\n`)
  if (process.argv.includes('--no-open')) return
  const open =
    process.platform === 'win32' ? `start "" "${authUrl}"` : process.platform === 'darwin' ? `open "${authUrl}"` : `xdg-open "${authUrl}"`
  exec(open)
})

setTimeout(() => {
  console.error('Timed out after 5 minutes.')
  process.exit(1)
}, 5 * 60 * 1000).unref()
