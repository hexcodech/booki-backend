const Knex          = require('knex');
const { Model }     = require('objection');

module.exports = (app) => {
    const knex = Knex({
        client: process.env.DB_CLIENT,
        connection: {
            filename: process.env.DB_SQLITE_FILENAME,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        }
    });
    Model.knex(knex);

    app.logger.info('Helpers -> Db -> Setup - Done');
    return knex;
};