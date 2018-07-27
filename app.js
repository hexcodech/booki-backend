const { logger, express, db }   = require('./helpers');
const IndexController           = require('./controllers');

class App {
    constructor() {
        this.logger = logger.setup(this);
        this.express = express.setup(this);
        this.db = db.setup(this);
        this.model = this.db.objection;

        this.indexController = new IndexController(this);

        this.express.use(require('./middlewares')(this));
        this.express.use(this.indexController.router);

        express.listen(this);
    }
}

module.exports = App;