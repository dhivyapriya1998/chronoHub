// src/components/oauth/routes.js
const {
  loginHandler,
  callbackHandler,
} = require('./handler/gmailAuth')

function registerOAuthRoutes(server) {
  server.route([
    { method: 'GET', path: '/login', handler: loginHandler },
    { method: 'GET', path: '/oauth2callback', handler: callbackHandler },
  ])
}

module.exports = { registerOAuthRoutes }
