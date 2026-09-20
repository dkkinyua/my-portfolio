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
