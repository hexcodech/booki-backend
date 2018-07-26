const Fs                = require('fs');
const { fsHelpers }     = require('./helpers');
const App               = require('./app');

if (!Fs.existsSync('.env')) {
    console.log(`.env file not found, copying .env.example...`); // eslint-disable-line
    fsHelpers.copyFile('.env.example', '.env').then(() => {
        require('dotenv-safe').config();
        new App();
    });
} else {
    require('dotenv-safe').config();
    new App();
}