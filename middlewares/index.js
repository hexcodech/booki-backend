module.exports = (app) => [
    require('./logger')(app),
    require('./helmet'),
    require('./cors'),
    require('./xPoweredBy'),
]