const Hapi = require("@hapi/hapi")
// Bootstrap modules
require('dotenv').config()
const config = require("./config")
const { setupGraphQL } = require("./bootstrap/graphql")
const {init: initMysql} = require('./bootstrap/mysql')
const { registerOAuthRoutes } = require('./src/components/oauth/routes')
const { oAuthClient } = require('./src/utils/auth')
const { registerEmailRoutes } = require('./src/components/gmail/routes')
async function init() {
  
 const server = Hapi.server({
  port: config.server.port || 3001,
  host: config.server.host || '0.0.0.0',
  routes: {
    cors: {
      origin: ['*'], // or specify your frontend origin(s) for better security
      credentials: false, // if you're sending cookies or auth headers
    },
  },
})
  
  await setupGraphQL(server)


  registerOAuthRoutes(server)
  registerEmailRoutes(server)
  

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}


process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err)
  process.exit(1)
})

init()