const { logger, express }        = require('./helpers');

class App {
    constructor() {
        this.logger = logger.setup(this);
        this.express = express.setup(this);
    }
}

module.exports = App;