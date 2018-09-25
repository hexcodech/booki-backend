
exports.up = function(knex, Promise) {
    return knex.schema.createTable('offer_answers', table => {
        table.collate('utf8_general_ci');
        table.charset('utf8');

        table.bigIncrements('offerAnswerID').unsigned().primary();
        table.bigInteger('userID').unsigned();
        table.foreign('userID').references('users.userID');
        table.bigInteger('offerQuestionID').unsigned();
        // Adding foreign key after create_offer_questions migration
        table.bigInteger('offerID').unsigned();
        table.foreign('offerID').references('offers.offerID');
        table.text('text');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('offer_aswers');
};
