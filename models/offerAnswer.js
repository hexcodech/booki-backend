const { Model }         = require('objection');
const Offer             = require('./offer');
const OfferQuestion     = require('./offerQuestion');
const User              = require('./user');

class OfferAnswer extends Model {
    static get tableName() {
        return 'offer_answers';
    }

    static get idColumn() {
        return 'offerAnswerID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['offerQuestionID', 'offerID', 'text'],

            properties: {
                offerAnswerID: {type: 'integer'},
                userID: {type: 'integer'},
                offerQuestionID: {type: 'integer'},
                offerID: {type: 'integer'},
                text: {type: 'string'},
                created_at: {type: 'integer'},
                updated_at: {type: 'integer'},
            }
        };
    }

    static get relationMappings() {
        return {
            offer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Offer,
                join: {
                    from: 'offer_answers.offerID',
                    to: 'offers.offerID',
                }
            },
            offerQuestion: {
                relation: Model.BelongsToOneRelation,
                modelClass: OfferQuestion,
                join: {
                    from: 'offer_answers.offerQuestionID',
                    to: 'offer_questions.offerQuestionID',
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'offer_answers.userID',
                    to: 'users.userID',
                }
            }
        };
    }
}

module.exports = OfferAnswer;