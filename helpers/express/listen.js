module.exports = (app) => {
    const port = parseInt(process.env.EXPRESS_LISTEN_PORT, 10);
    const ip = process.env.EXPRESS_LISTEN_IP

    app.express.listen(port, ip, () => {
        app.logger.info(`Helpers -> Express -> Listen - Listening to ${ip}:${port}`);
    });
}