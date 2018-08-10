const { logger, express, db }   = require('./helpers');
const Models                    = require('./models');
const IndexController           = require('./controllers');

class App {
    constructor() {
        this.logger = logger.setup(this);
        this.express = express.setup(this);
        this.knex = db.setup(this);
        this.models = Models;

        this.indexController = new IndexController(this);

        this.express.use(require('./middlewares')(this));
        this.express.use(this.indexController.router);

        express.listen(this);
    }
}

module.exports = App;