module.exports = (app) => {
    const middlewares = [
        require('./logger')(app),
        require('./helmet'),
        require('./cors'),
        require('./xPoweredBy'),
        require('./bodyParser'),
    ];

    app.logger.info('Middlewares - Done');
    return middlewares;
};