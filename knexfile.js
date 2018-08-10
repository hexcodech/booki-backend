const Fs                = require('fs');
const { fsHelpers }     = require('./helpers');

if (!Fs.existsSync('.env')) {
    console.log(`.env file not found, copying .env.example...`); // eslint-disable-line
    fsHelpers.copyFile('.env.example', '.env').then(() => {
        require('dotenv-safe').config();
    });
} else {
    require('dotenv-safe').config();
}

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        }
    },

    staging: {
        client: 'mysql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
