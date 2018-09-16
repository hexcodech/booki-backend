const { Model }         = require('objection');

class Book extends Model {
    static get tableName() {
        return 'books';
    }

    static get idColumn() {
        return 'bookID';
    }

    static get jsonSchema() {
        return {
        /*type: 'object',
            required: ['username', 'email'],

            properties: {
                userID: {type: 'integer'},
                username: {type: 'string', maxLength: 255},
                email: {type: 'string', maxLength: 255},
                passwordHash: {type: 'string', maxLength: 60},
                oauthFacebook: {type: 'string', maxLength: 512},
                oauthTwitter: {type: 'string', maxLength: 512},
                oauthAmazon: {type: 'string', maxLength: 512},
                created_at: {type: 'integer'},
                updated_at: {type: 'integer'},
            } */
        };
    }
}

module.exports = Book;