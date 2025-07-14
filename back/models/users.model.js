module.exports = function UserModel(sequelize, Datatypes){
  const User = sequelize.define('User',{
    id: {type: Datatypes.STRING, primaryKey: true},
    name: {type: Datatypes.STRING, unique: true},
    email: {type: Datatypes.STRING, unique: true},
    password: {type: Datatypes.STRING},
    scope: {type: Datatypes.STRING, unique: true},
  },{
    tableName: "users",
  },

  )

  return User
}