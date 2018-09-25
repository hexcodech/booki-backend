
exports.up = function(knex, Promise) {
    return knex.schema.table('offer_answers', (table) => {
        table.foreign('offerQuestionID').references('offer_questions.offerQuestionID');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('offer_answers', (table) => {
        table.dropForeign('offerQuestionID');
    });
};
