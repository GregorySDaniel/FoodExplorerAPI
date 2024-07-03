exports.up = function(knex) {
  return knex.schema.createTable("dishes", table => {
    table.increments('id');
    table.text('image'); 
    table.text('name'); 
    table.text('category'); 
    table.text('description'); 
    table.text('ingredients'); 
    table.decimal('price', 8, 2);
    
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("dishes");
};
