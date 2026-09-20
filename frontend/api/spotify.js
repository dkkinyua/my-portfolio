// GET /api/spotify -> what the site owner is playing now, plus their last 5 tracks.
// Read-only: visitors can't control playback through this.

const { getPlayerData } = require('./_lib/spotify')

// Log each configuration problem once per server instance instead of on every request.
const logged = new Set()
function logOnce(key, message) {
  if (logged.has(key)) return
  logged.add(key)
  console.error(message)
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  try {
    const data = await getPlayerData()
    // Every visitor shares one Spotify lookup per ~10s, which keeps us far from rate limits.
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=30')
    return res.status(200).json(data)
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store')

    if (err.code === 'reauth_required') {
      logOnce('reauth', 'SPOTIFY REAUTH NEEDED: refresh token rejected. Run `npm run spotify:auth`, update SPOTIFY_REFRESH_TOKEN in Vercel, redeploy.')
      return res.status(503).json({ error: 'reauth_required' })
    }
    if (err.code === 'not_configured') {
      logOnce('not_configured', `${err.message}. For the refresh token, run \`npm run spotify:auth\`.`)
      return res.status(503).json({ error: 'not_configured' })
    }

    console.error('Spotify request failed:', err.message)
    return res.status(502).json({ error: 'spotify_unavailable' })
  }
}
