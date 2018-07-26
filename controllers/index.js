const Express                   = require('express');
const OIDCProviderController    = require('./oidc');

class AppController {
    constructor(app) {
        this.app = app;
        this.router = Express.Router();
        this.initControllers();
        this.app.logger.info(`Controllers -> AppController - Done`);
    }

    initControllers() {
        this.oidcProviderController = new OIDCProviderController(this);
    }
}

module.exports = AppController;