// Dev-only: CRA's dev server doesn't run Vercel functions, so serve /api/spotify
// from the same handler that runs in production.
const { loadEnv } = require('../scripts/loadEnv')

module.exports = function (app) {
  loadEnv()
  app.get('/api/spotify', require('../api/spotify'))
}
