'use strict';

const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const db = require('./plugins/db');
const registerRoutes = require('./routes/index.js');


dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 4000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });


    await db.connect();

    // Register routes
    await registerRoutes(server);

    await server.start();
    console.log(` Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
