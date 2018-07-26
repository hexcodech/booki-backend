const { logger, express }       = require('./helpers');
const AppController             = require('./controllers');

class App {
    constructor() {
        this.logger = logger.setup(this);
        this.express = express.setup(this);

        this.appController = new AppController(this);

        this.express.use(require('./middlewares')(this));
        this.express.use(this.appController.router);

        express.listen(this);
    }
}

module.exports = App;