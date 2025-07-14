const { google } = require('googleapis')
const config = require("../../config")


const oAuthClient = new google.auth.OAuth2({
    client_id: config.googApi.clientId,
    clientSecret: config.googApi.secretId,
    redirectUri: config.googApi.redirectUrl,
})

module.exports = {
    oAuthClient
}
