const { Model }         = require('objection');
const Offer             = require('./offer');
const OfferAnswer       = require('./offerAnswer');
const User              = require('./user');

class OfferQuestion extends Model {
    static get tableName() {
        return 'offer_questions';
    }

    static get idColumn() {
        return 'offerQuestionID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['offerQuestionID', 'offerID', 'text'],

            properties: {
                offerQuestionID: {type: 'integer'},
                userID: {type: 'integer'},
                offerID: {type: 'integer'},
                text: {type: 'string'},
                created_at: {type: 'integer'},
                updated_at: {type: 'integer'},
            }
        };
    }

    static get relationMappings() {
        return {
            offerAnswers: {
                relation: Model.HasManyRelation,
                modelClass: OfferAnswer,
                join: {
                    from: 'offer_questions.offerQuestionID',
                    to: 'offer_answers.offerQuestionID',
                }
            },
            offer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Offer,
                join: {
                    from: 'offer_questions.offerID',
                    to: 'offers.offerID',
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'offer_questions.userID',
                    to: 'users.userID',
                }
            }
        };
    }
}

module.exports = OfferQuestion;