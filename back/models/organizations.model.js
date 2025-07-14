module.exports  = function OrganizationModel(sequelize, Datatypes) {

  const Organization = sequelize.define('Organization',{
    id: {type: Datatypes.STRING, primaryKey: true},
    name: {type: Datatypes.STRING, unique: true},
    features: {type: Datatypes.STRING},
    isActive: {type: Datatypes.BOOLEAN},

  },{
    tableName: 'organizations',
  },

  )
  return Organization

}