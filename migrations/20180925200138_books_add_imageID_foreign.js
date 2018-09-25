
exports.up = function(knex, Promise) {
    return knex.schema.table('books', table => {
        table.foreign('imageID').references('images.imageID');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('books', table => {
        table.dropForeign('imageID');
    });
};
