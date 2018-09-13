const Helmet            = require('helmet');

module.exports = Helmet({
    hidePoweredBy: false,
    frameguard: {
        action: 'allow-from',
        domain: process.env.FRAMEGUARD_ORIGIN,
    }
});