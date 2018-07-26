const Winston           = require('winston');

module.exports = () => {
    const logger = Winston.createLogger({
        level: process.env.LOG_LEVEL,
        format: Winston.format.combine(
            Winston.format.colorize(),
            Winston.format.timestamp(),
            Winston.format.printf(info => `${info.level} ${info.timestamp}: ${info.message}`)
        ),
        transports: [
            new Winston.transports.Console(),
        ]
    });

    logger.info(`Helpers -> Logger -> Setup - Done`);
    return logger;
}