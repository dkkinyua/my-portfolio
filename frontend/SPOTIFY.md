# Spotify "now playing" bar

The bar at the bottom of the site shows what the site owner is playing, and their last 5 tracks
when clicked. It is view-only. `api/spotify.js` (a Vercel function) holds the credentials and
calls the Spotify Web API; the browser only ever talks to `/api/spotify`.

## First-time setup

1. In the [Spotify developer dashboard](https://developer.spotify.com/dashboard), open your app
   > Settings > Redirect URIs and add exactly: `http://127.0.0.1:8888/callback`
2. Put `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in `.env` (see `.env.example`).
3. Run `npm run spotify:auth`, approve in the browser. It saves `SPOTIFY_REFRESH_TOKEN` into `.env`.
4. In Vercel > Settings > Environment Variables, add all three variables, then redeploy
   (functions only pick up env changes on a new deployment).

Local dev needs nothing extra: `npm start` serves `/api/spotify` through `src/setupProxy.js`.

## "Follow my playlists"

Opening the bar also shows up to 3 playlists, each linking to Spotify so visitors can follow it.
Spotify has no per-playlist play counts, so "most listened" is derived: each of your last 50
plays says which playlist it came from, and the most-played ones win (ties go to the most recent).

- Only **public** playlists appear (visitors can't open private ones, and their names never leave
  the server). Playlists you play from but that aren't on your profile are skipped too.
- Plays from Liked Songs, albums or artist pages don't count. Spotify-owned playlists (Discover
  Weekly, Daily Mix, editorial lists) usually can't be looked up by dev-mode apps, so they're skipped.
- If fewer than 3 qualify, the gaps are filled from `SPOTIFY_PLAYLIST_IDS` (optional, comma-separated
  links/URIs/IDs, set it in `.env` and in Vercel). It needs no extra Spotify permission.
- The section hides itself when there's nothing to show. Playlist details are cached for 10 minutes.

## "redirect_uri: Not matching configuration"

Spotify is saying the URI the script sent isn't saved on the app whose Client ID it used.
`npm run spotify:auth` prints both the URI and the last 4 characters of the Client ID. Check:

1. The URI is listed under **that** app's Settings > Redirect URIs (you may have several apps)
2. You clicked **Save** at the bottom of the settings page after adding it (Add alone doesn't save)
3. It matches character for character: `http` not `https`, `127.0.0.1` not `localhost`,
   port `8888`, path `/callback`, no trailing slash

If you registered a different loopback address, set `SPOTIFY_REDIRECT_URI` in `.env` to it.

## Re-authorizing (expired or revoked token)

When Spotify rejects the refresh token, `/api/spotify` returns `503 {"error":"reauth_required"}`,
the bar hides itself, and the Vercel function log says `SPOTIFY REAUTH NEEDED`.

1. `npm run spotify:auth`
2. Copy the new `SPOTIFY_REFRESH_TOKEN` from `.env` into Vercel
3. Redeploy

Check the function logs (Vercel > Logs, filter "SPOTIFY") if the bar ever disappears.

## Notes

- `api/_lib/spotify.js` is the only place Spotify is called. Only track name, artists, art URL,
  Spotify link and timing leave the server.
- Responses are CDN-cached for 10s, so traffic can't hit Spotify's rate limits.
- Vercel's project Root Directory must be `frontend/` for `api/` to be picked up as functions.
