
exports.up = function(knex, Promise) {
    return knex.schema.createTable('images', table => {
        table.collate('utf8_general_ci');
        table.charset('utf8');

        table.bigIncrements('imageID').unsigned().primary();
        table.bigInteger('userID').unsigned();
        table.foreign('userID').references('users.userID');
        table.string('url', 1024);
        table.string('filePath', 1024);
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('images');
};
