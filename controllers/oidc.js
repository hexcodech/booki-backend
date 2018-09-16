const OidcProvider          = require('oidc-provider');
const {oidc}                = require('../helpers');

class OIDCProviderController {
    constructor({app, router}) {
        this.app = app;
        this.router = router;
        
        this.cookieKeys = [
            this.generateCookieKey(), // Warmup the key array
            this.generateCookieKey(),
            this.generateCookieKey(),
        ];
        this.startCookieKeysRotateInterval();
        this.oidc = new ((OidcProvider.prototype.constructor).bind(this))(process.env.OIDC_ISSUER, {
            findById: (r,u) => this.findById(r,u),
            claims: {
                openid: ['sub'],
                profile: ['private'],
            },
            cookies: {
                keys: this.cookieKeys,
                long: { signed: true },
                short: { signed: true },
                thirdPartyCheckUrl: 'https://cdn.rawgit.com/panva/3rdpartycookiecheck/92fead3f/start.html', // TODO: How can we replicate this?
            },
            interactionUrl(ctx) {
                return `${process.env.OIDC_INTERACTION_URL_BASE}${ctx.oidc.uuid}`;
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
            ttl: { 
                AccessToken: 3600,
                IdToken: 3600
            }
        });

        oidc.loadKeystore().then(keystore => {
            return this.oidc.initialize({
                keystore,
                clients: [{
                    application_type: process.env.OIDC_DEBUG_MODE === 'true' ? 'native' : 'web', // Silent renews don't work in native type
                    client_id: process.env.OIDC_CLIENT_ID,
                    grant_types: process.env.OIDC_GRANT_TYPES.split(','),
                    response_types: [process.env.OIDC_RESPONSE_TYPES],
                    redirect_uris: process.env.OIDC_REDIRECT_URIS.split(','),
                    post_logout_redirect_uris: process.env.OIDC_POST_LOGOUT_REDIRECT_URIS.split(','),
                    token_endpoint_auth_method: 'none',
                }],
            });
        }).then(() => {
            this.router.get(`${process.env.OIDC_INTERACTION_URL_BASE}:grant`, (req, res) => {
                this.oidc.interactionDetails(req).then(details => {
                    details.interactionUrlBase = process.env.OIDC_INTERACTION_URL_BASE;
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
                }).catch(err => {
                    res.status(500).json(err);
                    this.app.logger.error(err.toString());
                });
            });
            this.router.post(`${process.env.OIDC_INTERACTION_URL_BASE}:grant/confirm`, (req, res) => {
                this.oidc.interactionFinished(req, res, {
                    consent: {},
                });
            });
            this.router.post(`${process.env.OIDC_INTERACTION_URL_BASE}:grant/login`, (req, res, next) => {
                this.app.models.User.authenticate(req.body.email, req.body.password)
                    .then(user => {
                        return this.oidc.interactionFinished(req, res, {
                            login: {
                                account: user.userID,
                                acr: '1',
                                remember: !!req.body.remember,
                                ts: Math.floor(Date.now() / 1000),
                            },
                            consent: {
                                // TODO: remove offline_access from scopes if remember is not checked
                            },
                        })
                            .then(() => this.app.logger.info(`User ${user.username} successfully logged in`))
                            .catch(err => {
                                res.status(err.statusCode).json(err);
                                this.app.logger.error(err.toString());
                            });
                    })
                    .catch(err => {
                        res.status(401).end();
                        this.app.logger.error(err.toString());
                    });
            });
            this.router.post(`${process.env.OIDC_INTERACTION_URL_BASE}:grant/register`, (req, res) => {
                this.oidc.interactionDetails(req).then(details => {
                    this.app.models.User.register(req.body.email, req.body.username, req.body.password)
                        .then(() => {
                            this.app.logger.info(`User ${req.body.username} successfully registered`);
                            details.flashMessage = 'register_successful';
                            details.save().then(() => res.redirect(`${process.env.OIDC_INTERACTION_URL_BASE}${details.id}`));
                        });
                }).catch(err => {
                    res.status(400).end();
                    this.app.logger.error(err.toString());
                });
            });
            this.router.use('/oidc', this.oidc.callback);
            this.app.logger.info('Controllers -> AppController -> OidcController - Done');
        }).catch(err => {
            this.app.logger.error(err);
        });
    }

    async findById(reqContext, username) {
        return {
            accountId: username,
            claims: async (use, scope) => { 
                return { 
                    sub: username,
                    private: await this.app.models.User.loadPrivateProfile(username),
                }; 
            },
        };
    }

    generateCookieKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    startCookieKeysRotateInterval() {
        setInterval(() => {
            this.cookieKeys.unshift(this.generateCookieKey());
            this.cookieKeys.pop();
        }, 24*60*60*1000);
    }
}

module.exports = OIDCProviderController;