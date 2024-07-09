exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments('id');
    table.text('name').notNullable(); 
    table.text('email').notNullable(); 
    table.text('password').notNullable(); 
    table.enum('role', ['admin', 'customer'], { useNative: true, enumName: 'roles' }).notNullable().default('customer')
    
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
