const Express           = require('express');
const Path              = require('path');

module.exports = (app) => {
    const express = Express();
    express.set('view engine', 'ejs');
    express.set('views', Path.resolve(__dirname, '../../views'));
    
    app.logger.info(`Helpers -> Express -> Setup - Done`);
    return express;
};