const { Sequelize } = require("sequelize")
require('dotenv').config()

let sequelizeConnection

try {
  console.log("pro",process.env.DB_USER)
  
  sequelizeConnection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      logging: console.log,
    },
  )
} catch (err) {
  console.error("Sequelize init error:", err)
}


const User = require("../models/users.model")(sequelizeConnection, Sequelize.DataTypes)
const Organization = require("../models/organizations.model")(sequelizeConnection, Sequelize.DataTypes)
console.log("Heo")


module.exports = {
  sequelizeConnection,
  User,
  Organization,
  init: async (syncOptions = {}) => {
    console.log("Initializing Sequelize sync...")
    return sequelizeConnection.sync(syncOptions)

  },
}
