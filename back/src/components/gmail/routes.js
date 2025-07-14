const { emailList, getEmailById } = require('../gmail/handler/gmailApi')


function registerEmailRoutes(server){
    server.route([
        {
        method: 'GET', path: '/emails', handler: emailList,
        },
        {
         method: 'GET', path: '/email/{id}', handler: getEmailById,
}
    ])
}

module.exports = {
    registerEmailRoutes
}