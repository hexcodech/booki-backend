const { Model }         = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'userID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'email'],

            properties: {
                userID: {type: 'integer'},
                username: {type: 'string', maxLength: 255},
                email: {type: 'string', maxLength: 255},
                passwordHash: {type: 'string', maxLength: 1024},
                passwordSalt: {type: 'string', maxLength: 10},
                oauthFacebook: {type: 'string', maxLength: 512},
                oauthTwitter: {type: 'string', maxLength: 512},
                oauthAmazon: {type: 'string', maxLength: 512},
                created_at: {type: 'integer'},
                updated_at: {type: 'integer'},
            }
        };
    }

    static async authenticate(email, password) {
        const users = await User.query()
            .where('email', '=', email)
            .limit(1);
        console.dir(users);

        if (users[0])
            return users[0];
        else
            throw `Account not found`;
    }
}

module.exports = User;