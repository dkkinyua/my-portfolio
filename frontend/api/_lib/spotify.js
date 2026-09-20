// Server-side Spotify client for the site owner's account.
// Files starting with `_` in /api are helpers, not routes. Never import this from src/.

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const API_URL = 'https://api.spotify.com/v1'

class SpotifyError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

// Access tokens last an hour; reuse them across warm invocations.
let cached = { token: null, expiresAt: 0 }

async function getAccessToken() {
  const {
    SPOTIFY_CLIENT_ID: id,
    SPOTIFY_CLIENT_SECRET: secret,
    SPOTIFY_REFRESH_TOKEN: refreshToken,
  } = process.env

  if (!id || !secret || !refreshToken) {
    throw new SpotifyError(
      'not_configured',
      'SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN must all be set'
    )
  }

  if (cached.token && Date.now() < cached.expiresAt - 60_000) return cached.token

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
  })
  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    // Revoked or expired refresh token: only re-running `npm run spotify:auth` fixes this.
    if (body.error === 'invalid_grant') {
      throw new SpotifyError('reauth_required', 'Spotify rejected the refresh token (invalid_grant)')
    }
    throw new SpotifyError('token_error', `Token request failed: ${res.status} ${body.error ?? ''}`.trim())
  }

  cached = { token: body.access_token, expiresAt: Date.now() + body.expires_in * 1000 }
  return cached.token
}

// Returns parsed JSON, or null when Spotify answers 204 (nothing is playing).
async function spotifyGet(path, token) {
  const res = await fetch(`${API_URL}${path}`, { headers: { Authorization: `Bearer ${token}` } })

  if (res.status === 204) return null
  if (res.status === 401) {
    cached = { token: null, expiresAt: 0 }
    throw new SpotifyError('unauthorized', 'Spotify rejected the access token')
  }
  if (res.status === 429) {
    throw new SpotifyError('rate_limited', `Rate limited, retry after ${res.headers.get('retry-after')}s`)
  }
  if (!res.ok) throw new SpotifyError('api_error', `Spotify API ${res.status} for ${path.split('?')[0]}`)

  return res.json()
}

// Album art comes in 640/300/64px; the 300px one suits every size we render.
function pickImage(images = []) {
  const sorted = [...images].sort((a, b) => Math.abs(a.width - 300) - Math.abs(b.width - 300))
  return sorted[0]?.url ?? null
}

// Only these fields ever leave the server.
function toTrack(track) {
  return {
    name: track.name,
    artists: track.artists.map((artist) => artist.name).join(', '),
    image: pickImage(track.album?.images),
    url: track.external_urls?.spotify ?? null,
    durationMs: track.duration_ms,
  }
}

async function getPlayerData() {
  const token = await getAccessToken()

  const [current, recent] = await Promise.allSettled([
    spotifyGet('/me/player/currently-playing', token),
    spotifyGet('/me/player/recently-played?limit=5', token),
  ])

  // The recent list is a bonus; if only that call failed, still show what's playing.
  if (current.status === 'rejected') throw current.reason
  if (recent.status === 'rejected') console.error('Recently played failed:', recent.reason.message)

  const playing = current.value
  const recentItems = recent.status === 'fulfilled' ? recent.value?.items ?? [] : []

  return {
    nowPlaying:
      playing?.item && playing.currently_playing_type === 'track'
        ? { ...toTrack(playing.item), isPlaying: playing.is_playing, progressMs: playing.progress_ms }
        : null,
    recent: recentItems.map((item) => ({ ...toTrack(item.track), playedAt: item.played_at })),
    fetchedAt: Date.now(),
  }
}

module.exports = { getPlayerData, SpotifyError }
