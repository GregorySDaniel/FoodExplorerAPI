exports.up = function(knex) {
  return knex.schema.createTable("ingredients", table => {
    table.increments('id');
    table.text('name').notNullable();

    table.text('dish_id').references('id').inTable('dishes').onDelete('CASCADE'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("ingredients");
};
