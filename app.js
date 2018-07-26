const { logger, express }        = require('./helpers');

class App {
    constructor() {
        this.booki = {};

        this.booki.logger = logger.setup(this.booki);
        this.booki.express = express.setup(this.booki);
    }
}

module.exports = App;