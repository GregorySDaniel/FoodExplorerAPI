exports.up = function(knex) {
  return knex.schema.createTable("dishes", table => {
    table.increments('id');
    table.text('image'); 
    table.text('name').notNullable();
    table.enu('category', ['meals', 'dessert', 'drinks']).notNullable();
    table.text('description'); 
    table.decimal('price', 8, 2).notNullable();
    
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("dishes");
};
