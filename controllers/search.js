const SphinxClient          = require('sphinxapi');

class SearchController {
    constructor({app, router}) {
        this.app = app;
        this.router = router;
        this.sphinxClient = new SphinxClient();
        this.sphinxClient.SetServer(process.env.SPHINX_HOST, parseInt(process.env.SPHINX_PORT, 10));

        this.getSphinxStatus();
        SearchController.setSearchEngineOptions(this.sphinxClient);

        this.routes();

        this.app.logger.info('Controllers -> AppController -> SearchController - Done');
    }

    static setSearchEngineOptions(sphinxClient) {
        sphinxClient.SetFieldWeights({
            title: 5,
            authors: 3,
        });
    }

    getSphinxStatus() {
        this.sphinxClient.Status((err, res) => {
            if (err)
                this.app.logger.error(`SearchController sphinx connection ${err}`);
            else
                this.app.logger.info(`Sphinx search engine successfully connected - Uptime ${res.uptime}`);
        });
    }
    getBooksBySphinxResult(sphinxRes) {
        console.dir(sphinxRes);
    }
    routes() {
        this.router.get('/search/books', (req, res) => {
            this.sphinxClient.Query(req.query.q, process.env.SPHINX_BOOK_INDEX, (err, sres) => {
                this.getBooksBySphinxResult(sres);
                //TODO: Get book info from isbnPirate DB
                res.json();
            });
        });
    }
}

module.exports = SearchController;