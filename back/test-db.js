require('dotenv').config()
const { Sequelize } = require('sequelize')

console.log("Trying to connect...")
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log,
  },
)

sequelize.authenticate()
  .then(() => console.log("Connected to MySQL!"))
  .catch((err) => console.error("Connection failed:", err))
