const Cors          = require('cors');

const origin = process.env.CORS_ORIGINS.split(',');

module.exports = Cors({
    origin,
});