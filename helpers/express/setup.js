const Express           = require('express');

module.exports = (app) => {
    const express = Express();
    app.logger.info(`Helpers -> Express -> Setup - Done`);
    return express;
}