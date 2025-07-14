const PDI = require("pdi-js")

async function getUsers(root, args, context) {
  const UserModel = await PDI.get("mysql/Users")
  return UserModel.findAll()
}

async function getUserById(root, { id }, context) {
  const UserModel = await PDI.get("mysql/Users")
  return UserModel.findByPk(id)
}

const resolvers = {
  Query: {
    getUsers,
    getUserById,
  },
}

module.exports = resolvers
