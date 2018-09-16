const Express                   = require('express');
const OIDCProviderController    = require('./oidc');
const SearchController          = require('./search');

class IndexController {
    constructor(app) {
        this.app = app;
        this.router = Express.Router();
        this.initControllers();
        this.app.logger.info(`Controllers -> AppController - Done`);
    }

    initControllers() {
        this.oidcProviderController = new OIDCProviderController(this);
        this.searchController = new SearchController(this);
    }
}

module.exports = IndexController;