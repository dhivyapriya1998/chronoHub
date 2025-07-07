// routes/dashboard.routes.js
const { getDashboardSummary } = require('../controller/dashboardController');

module.exports = {
    name: 'dashboard-routes',
    version: '1.0.0',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/dashboard/summary',
                handler: getDashboardSummary
            }
        ]);
    },
};
