
exports.up = function(knex, Promise) {
    return knex.schema.createTable('offers', table => {
        table.collate('utf8_general_ci');
        table.charset('utf8');

        table.bigIncrements('offerID').unsigned().primary();
        table.bigInteger('userID').unsigned();
        table.foreign('userID').references('users.userID');
        table.bigInteger('bookID').unsigned();
        table.foreign('bookID').references('books.bookID');
        table.text('comment');
        table.enu('condition', [
            'brandNew',
            'likeNew',
            'good',
            'used',
            'heavilyUsed',
            'withNotes',
            'withSolutions',
        ]);
        table.decimal('price');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('offers');
};
