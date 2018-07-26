const ExpressWinston            = require('express-winston');

module.exports = (app) => ExpressWinston.logger({
    winstonInstance: app.logger,
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    colorize: true,
});