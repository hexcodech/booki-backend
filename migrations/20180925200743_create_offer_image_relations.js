
exports.up = function(knex, Promise) {
    return knex.schema.createTable('offer_image_relations', table => {
        table.collate('utf8_general_ci');
        table.charset('utf8');

        table.bigIncrements('offerImageRelationID').unsigned().primary();
        table.bigInteger('offerID').unsigned();
        table.foreign('offerID').references('offers.offerID');
        table.bigInteger('imageID').unsigned();
        table.foreign('imageID').references('images.imageID');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('offer_image_relations');
};
