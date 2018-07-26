const Path              = require('path');
const Fs                = require('fs');
const generateKeystore  = require('./generateKeystore');

module.exports = async () => {
    const keystorePath = Path.join(__dirname, '../../keystore.json');
    if (Fs.existsSync(keystorePath)) {
        return require(keystorePath);
    }

    return await generateKeystore();
}