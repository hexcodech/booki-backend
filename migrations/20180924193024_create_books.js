
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', table => {
        table.collate('utf8_general_ci');
        table.charset('utf8');

        table.bigIncrements('bookID').unsigned().primary();
        table.bigInteger('isbn', 13).unique().notNullable();
        table.string('isbn10', 10).unique().notNullable();
        table.string('title', 1024);
        table.string('authors', 1024);
        table.string('publisher', 255);
        table.integer('publication_date');
        table.string('edition', 255);
        table.string('binding', 255);
        table.integer('pages');
        table.text('description');
        table.bigInteger('imageID').unsigned();
        table.decimal('listPrice');
        table.string('language', 5);
        table.boolean('approved');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books');
};
