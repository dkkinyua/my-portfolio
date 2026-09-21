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
  if (!res.ok) {
    const error = new SpotifyError('api_error', `Spotify API ${res.status} for ${path.split('?')[0]}`)
    error.status = res.status
    throw error
  }

  return res.json()
}

// Album art comes in 640/300/64px; the 300px one suits every size we render.
// Playlist covers often have no width at all, so fall back to the first image.
function pickImage(images = []) {
  const sized = images.filter((image) => image.width)
  if (sized.length === 0) return images[0]?.url ?? null
  return sized.sort((a, b) => Math.abs(a.width - 300) - Math.abs(b.width - 300))[0].url
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

// --- Playlists -------------------------------------------------------------------------
// Spotify has no per-playlist play counts, so "most listened" is derived: every recently
// played track says which playlist it was played from (`context`), and we count those.

const PLAYLIST_TTL_MS = 10 * 60_000 // names/covers rarely change
const MISS_TTL_MS = 60 * 60_000 // private, Spotify-owned or deleted playlists won't start working
const playlistCache = new Map()

// Accepts spotify:playlist:ID, an open.spotify.com/playlist/ID link, or a bare 22-char ID.
function playlistIdFrom(text) {
  if (!text) return null
  const trimmed = String(text).trim()
  return trimmed.match(/playlist[:/]([A-Za-z0-9]{10,})/)?.[1] ?? (/^[A-Za-z0-9]{22}$/.test(trimmed) ? trimmed : null)
}

// Public playlists only: a visitor can't open (or follow) a private one, and this keeps
// private playlist names from ever leaving the server.
async function getPublicPlaylist(id, token) {
  const hit = playlistCache.get(id)
  if (hit && hit.expiresAt > Date.now()) return hit.value

  let value = null
  let ttl = MISS_TTL_MS
  try {
    const fields = encodeURIComponent('id,name,public,images,external_urls,owner(display_name)')
    const playlist = await spotifyGet(`/playlists/${id}?fields=${fields}`, token)
    if (playlist?.public === true) {
      value = {
        id,
        name: playlist.name,
        image: pickImage(playlist.images),
        url: playlist.external_urls?.spotify ?? null,
        owner: playlist.owner?.display_name ?? null,
      }
      ttl = PLAYLIST_TTL_MS
    }
  } catch (err) {
    // Only remember genuine "no access" answers; blips and rate limits get retried next time.
    if (err.status !== 403 && err.status !== 404) return null
  }

  playlistCache.set(id, { value, expiresAt: Date.now() + ttl })
  return value
}

async function getTopPlaylists(recentItems, token) {
  const counts = new Map()
  for (const item of recentItems) {
    const id = item.context?.type === 'playlist' ? playlistIdFrom(item.context.uri) : null
    if (id) counts.set(id, (counts.get(id) ?? 0) + 1)
  }

  // Sort is stable, so ties go to whichever playlist was played most recently.
  const played = [...counts].sort((a, b) => b[1] - a[1]).map(([id]) => id).slice(0, 5)
  // Optional: playlists to fall back on when fewer than 3 public ones were played lately.
  const pinned = (process.env.SPOTIFY_PLAYLIST_IDS ?? '').split(',').map(playlistIdFrom).filter(Boolean)

  const candidates = [...new Set([...played, ...pinned])]
  const resolved = await Promise.all(candidates.map((id) => getPublicPlaylist(id, token)))
  return resolved.filter(Boolean).slice(0, 3)
}

async function getPlayerData() {
  const token = await getAccessToken()

  // 50 plays (the API maximum): the first 5 are the "recent" list, all 50 feed the playlist ranking.
  const [current, recent] = await Promise.allSettled([
    spotifyGet('/me/player/currently-playing', token),
    spotifyGet('/me/player/recently-played?limit=50', token),
  ])

  // The recent list is a bonus; if only that call failed, still show what's playing.
  if (current.status === 'rejected') throw current.reason
  if (recent.status === 'rejected') console.error('Recently played failed:', recent.reason.message)

  const playing = current.value
  const recentItems = recent.status === 'fulfilled' ? recent.value?.items ?? [] : []

  // Playlists are a bonus too: never let them take down the now-playing bar.
  let playlists = []
  try {
    playlists = await getTopPlaylists(recentItems, token)
  } catch (err) {
    console.error('Playlists failed:', err.message)
  }

  return {
    nowPlaying:
      playing?.item && playing.currently_playing_type === 'track'
        ? { ...toTrack(playing.item), isPlaying: playing.is_playing, progressMs: playing.progress_ms }
        : null,
    recent: recentItems.slice(0, 5).map((item) => ({ ...toTrack(item.track), playedAt: item.played_at })),
    playlists,
    fetchedAt: Date.now(),
  }
}

module.exports = { getPlayerData, SpotifyError }
