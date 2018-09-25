const { Model }         = require('objection');
const Book              = require('./book');
const OfferQuestion     = require('./offerQuestion');
const OfferAnswer       = require('./offerAnswer');
const User              = require('./user');
const Image             = require('./image');

class Offer extends Model {
    static get tableName() {
        return 'offers';
    }

    static get idColumn() {
        return 'offerID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['userID', 'bookID', 'condition', 'price'],

            properties: {
                offerID: {type: 'integer'},
                userID: {type: 'integer'},
                bookID: {type: 'integer'},
                comment: {type: 'string'},
                condition: {type: 'string'},
                price: {type: 'number'},
                created_at: {type: 'integer'},
                updated_at: {type: 'integer'},
            }
        };
    }

    static get relationMappings() {
        return {
            book: {
                relation: Model.BelongsToOneRelation,
                modelClass: Book,
                join: {
                    from: 'offers.bookID',
                    to: 'books.bookID',
                }
            },
            offerQuestions: {
                relation: Model.HasManyRelation,
                modelClass: OfferQuestion,
                join: {
                    from: 'offers.offerID',
                    to: 'offer_questions.offerID',
                }
            },
            offerAnswers: {
                relation: Model.HasManyRelation,
                modelClass: OfferAnswer,
                join: {
                    from: 'offers.offerID',
                    to: 'offer_answers.offerID',
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'offers.userID',
                    to: 'users.userID',
                }
            },
            images: {
                relation: Model.ManyToManyRelation,
                modelClass: Image,
                join: {
                    from: 'offers.offerID',
                    through: {
                        from: 'offer_image_relations.offerID',
                        to: 'offer_image_relations.imageID',
                    },
                    to: 'images.imageID',
                }
            }
        };
    }
}

module.exports = Offer;