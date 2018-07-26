const { logger, express }        = require('./helpers');

class App {
    constructor() {
        this.logger = logger.setup(this);
        this.express = express.setup(this);

        this.express.use(require('./middlewares'));
        this.express.use(require('./controllers'));
        express.listen(this);
    }
}

module.exports = App;