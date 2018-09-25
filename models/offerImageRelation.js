const { Model }         = require('objection');
const Offer             = require('./offer');
const Image             = require('./image');

class OfferImageRelation extends Model {
    static get tableName() {
        return 'offer_image_relations';
    }

    static get idColumn() {
        return 'offerImageRelationID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['offerID', 'imageID'],

            properties: {
                offerImageRelationID: {type: 'integer'},
                offerID: {type: 'integer'},
                imageID: {type: 'integer'},
            }
        };
    }

    static get relationMappings() {
        return {
            offer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Offer,
                join: {
                    from: 'offer_image_relations.offerID',
                    to: 'offers.offerID',
                }
            },
            image: {
                relation: Model.BelongsToOneRelation,
                modelClass: Image,
                join: {
                    from: 'offer_image_relations.imageID',
                    to: 'images.imageID',
                }
            }
        };
    }
}

module.exports = OfferImageRelation;