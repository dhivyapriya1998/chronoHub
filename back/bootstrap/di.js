const PDI = require("pdi-js")
const config = require("../config")
const mySqlServices = require("./mysql")

const di = new PDI()

di.set("config", config)

Object.entries(mySqlServices).forEach(([name, model]) => {
  di.set(`mysql/${name}`, model)
})

PDI.setStaticDi(di)
module.exports = di
