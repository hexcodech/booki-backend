const { Model }         = require('objection');
const Bcrypt            = require('bcrypt');

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
                passwordHash: {type: 'string', maxLength: 60},
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

        if (users[0]) {
            if (!(await Bcrypt.compare(password, users[0].passwordHash)))
                throw `Wrong password`;

            return users[0];
        }
        else
            throw `Account not found`;
    }

    static async register(email, username, plainPassword) {
        return await User
            .query()
            .insert({
                email,
                username,
                passwordHash: await Bcrypt.hash(plainPassword, 10)
            });
    }

    static async loadPrivateProfile(userID) {
        const user = await User
            .query()
            .where({
                userID
            })
            .select(
                'username',
                'email',
            )
            .limit(1);
        return user[0];
    }
}

module.exports = User;