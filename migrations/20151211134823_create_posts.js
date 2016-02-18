exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table){
    table.increments();
    table.string('post_text');
    table.integer('user_id').unsigned().index().references('users.id').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {

};
