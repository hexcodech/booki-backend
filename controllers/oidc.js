const OidcProvider          = require('oidc-provider');
const {oidc}                = require('../helpers');

class OIDCProviderController {
    constructor({app, router}) {
        this.app = app;
        this.router = router;
        this.oidc = new OidcProvider(process.env.OIDC_ISSUER);

        oidc.loadKeystore().then(keystore => {
            return this.oidc.initialize({
                keystore
            });
        })
        .then(() => {
            this.router.use('/identity', this.oidc.callback);
        })
        .catch(err => {
            this.app.logger.error(err);
        });
    }
}

module.exports = OIDCProviderController;