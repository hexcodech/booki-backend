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
            type: 'object',
            required: ['isbn', 'isbn10'],

            properties: {
                bookID: {type: 'integer'},
                isbn: {type: 'isbn'},
                isbn10: {type: 'string', maxLength: 10},
                title: {type: 'string', maxLength: 1024},
                authors: {type: 'string', maxLength: 1024},
                publisher: {type: 'string', maxLength: 255},
                publication_date: {type: 'integer'},
                edition: {type: 'string', maxLength: 255},
                binding: {type: 'string', maxLength: 255},
                pages: {type: 'integer'},
                description: {type: 'string'},
                imageID: {type: 'integer'},
                listPrice: {type: 'decimal'},
                language: {type: 'string'},
                approved: {type: 'boolean'},
                created_at: {type: 'integer'},
                updated_at: {type: 'integer'},
            }
        };
    }
}

module.exports = Book;