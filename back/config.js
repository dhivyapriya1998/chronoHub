module.exports = {
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.API_PORT || 3001,
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "user",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "mydb",
    dialect: "mysql",
  },
  env: process.env.NODE_ENV || "development",
  googApi:{
    clientId: process.env.CLIENT_ID,
    secretId: process.env.CLIENT_SECRET,
    redirectUrl: process.env.REDIRECT_URI,
  },
}
