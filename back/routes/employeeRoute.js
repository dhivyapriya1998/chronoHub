const {
    getAllEmployeesHandler,
    getEmployeeByIdHandler,
    createEmployeeHandler, deleteEmployeeHandler, updateEmployeeHandler,
} = require('../controller/employeeController');

module.exports = {
    name: 'employee-routes',
    version: '1.0.0',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/employees',
                handler: getAllEmployeesHandler,
            },
            {
                method: 'GET',
                path: '/employees/{id}',
                handler: getEmployeeByIdHandler,
            },
            {
                method: 'POST',
                path: '/employees',
                handler: createEmployeeHandler,
            },
            {
                method: 'DELETE',
                path: '/employees/{id}',
                handler: deleteEmployeeHandler,
            },
            {
                method: 'PUT',
                path: '/employees/{id}',
                handler: updateEmployeeHandler
            }
        ]);
    },
};
