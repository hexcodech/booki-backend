module.exports = (booki) => {
    const port = parseInt(process.env.EXPRESS_LISTEN_PORT, 10);
    const ip = process.env.EXPRESS_LISTEN_IP

    booki.express.listen(port, ip, () => {
        if (booki.logger)
            logger.info(`Helpers -> Express -> Listen - Listening to ${ip}:${port}`);
    });
}