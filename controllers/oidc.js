const OidcProvider          = require('oidc-provider');
const {oidc}                = require('../helpers');

class OIDCProviderController {
    constructor({app, router}) {
        this.app = app;
        this.router = router;

        // Testurl: http://localhost:3000/oidc/auth?client_id=booki_webapp&redirect_uri=https://booki.me&response_type=id_token&scope=openid%20booki_user_api&nonce=123&state=321
        this.oidc = new OidcProvider(process.env.OIDC_ISSUER, {
            findById: this.findById,
            claims: {
                openid: ['sub'],
                email: ['email', 'email_verified'],
            },
            interactionUrl(ctx) {
                return `/oidc/interaction/${ctx.oidc.uuid}`;
            },
            features: {
                // disable the packaged interactions
                devInteractions: false,
            
                claimsParameter: true,
                conformIdTokenClaims: true,
                discovery: true,
                encryption: true,
                introspection: true,
                registration: true,
                request: true,
                requestUri: true,
                revocation: true,
                sessionManagement: true,
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
            this.router.get('/oidc/interaction/:grant', (req, res) => {
                this.oidc.interactionDetails(req).then(details => {
                    let view;

                    switch (details.interaction.reason) {
                    case 'consent_prompt':
                    case 'client_not_authorized':
                        view = 'interaction';
                        break;
                    default:
                        view = 'login';
                        break;
                    }

                    res.render(view, {details});
                }).catch(err => {return err;});
            });
            this.router.post('/oidc/interaction/:grant/confirm', (req, res) => {
                this.oidc.interactionFinished(req, res, {
                    consent: {},
                });
            });
            this.router.post('/oidc/interaction/:grant/login', (req, res, next) => {
                this.app.logger.info(req.body.email);
                this.app.logger.info(req.body.password);
                this.app.models.User.authenticate(req.body.email, req.body.password)
                    .then(user => this.oidc.interactionFinished(req, res, {
                        login: {
                            account: user.userID,
                            acr: '1',
                            remember: !!req.body.remember,
                            ts: Math.floor(Date.now() / 1000),
                        },
                        consent: {
                            // TODO: remove offline_access from scopes if remember is not checked
                        },
                    }))
                    .catch(next);
            });
            this.router.use('/oidc', this.oidc.callback);
        }).catch(err => {
            this.app.logger.error(err);
        });
    }

    async findById(reqContext, username) {
        return {
            accountId: username,
            async claims(use, scope) { return { sub: username }; },
        };
    }
}

module.exports = OIDCProviderController;