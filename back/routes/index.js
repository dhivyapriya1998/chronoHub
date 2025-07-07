const employeeRoutes = require('../routes/employeeRoute');
const dashboardRoutes = require('../routes/dashboardRoute');

module.exports = async function registerRoutes(server){
    await server.register([
        employeeRoutes,
        dashboardRoutes,
    ])
}