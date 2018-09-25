
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.collate('utf8_general_ci');
        table.charset('utf8');

        table.bigIncrements('userID').unsigned().primary();
        table.string('username', 255).unique().notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('passwordHash', 60);
        table.string('oauthFacebook', 512);
        table.string('oauthTwitter', 512);
        table.string('oauthAmazon', 512);
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
