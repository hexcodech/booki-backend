const Express           = require('express');

module.exports = (booki) => {
    const express = Express();
    booki.logger.info(`Helpers -> Express -> Setup - Done`);
    return express;
}