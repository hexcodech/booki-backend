const { Model }         = require('objection');
const User              = require('./user');

class Image extends Model {
    static get tableName() {
        return 'images';
    }

    static get idColumn() {
        return 'imageID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['offerID', 'imageID'],

            properties: {
                imageID: {type: 'integer'},
                userID: {type: 'integer'},
                url: {type: 'string', maxLength: 1024},
                filePath: {type: 'string', maxLength: 1024},
                created_at: {type: 'integer'},
                updated_at: {type: 'integer'},
            }
        };
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'images.userID',
                    to: 'users.userID',
                }
            }
        };
    }
}

module.exports = Image;