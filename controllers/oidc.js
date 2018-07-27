const OidcProvider          = require('oidc-provider');
const {oidc}                = require('../helpers');

class OIDCProviderController {
    constructor({app, router}) {
        this.app = app;
        this.router = router;

        // Testurl: http://localhost:3000/oidc/auth?client_id=booki_webapp&redirect_uri=https://booki.me&response_type=id_token&scope=openid%20booki_user_api&nonce=123&state=321
        this.oidc = new OidcProvider(process.env.OIDC_ISSUER, {
            scopes: [
                'booki_user_api'
            ],
            async findById(reqContext, username) {
                return {
                    accountId: username,
                    async claims(use, scope) { return { sub: username }; },
                };
            },
        });

        oidc.loadKeystore().then(keystore => {
            return this.oidc.initialize({
                keystore,
                clients: [{
                    client_id: process.env.OIDC_CLIENT_ID,
                    grant_types: process.env.OIDC_GRANT_TYPES.split(','),
                    response_types: process.env.OIDC_RESPONSE_TYPES.split(','),
                    redirect_uris: process.env.OIDC_REDIRECT_URIS.split(','),
                    token_endpoint_auth_method: 'none',
                }],
            });
        }).then(() => {
            this.router.use('/oidc', this.oidc.callback);
        }).catch(err => {
            this.app.logger.error(err);
        });
    }
}

module.exports = OIDCProviderController;