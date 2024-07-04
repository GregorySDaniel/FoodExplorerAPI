const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class DishesController {
  async create(req, res){
    const { name, category, description, ingredients, price } = req.body;

    if(!name || !description || !price) {
      throw new AppError("Preencha todas as informações obrigatórias sobre o prato.", 401);
    }

    
    const [dish_id] = await knex('dishes').insert({
      name,
      category,
      description,
      price
    });
    
    const ingredientsInsert = ingredients.map((ingredient) => {
      return{
        dish_id,
        name: ingredient
      }
    });

    console.log(ingredientsInsert)

    await knex('ingredients').insert(ingredientsInsert);
    

    res.json({name, category, description, ingredients, price});
  }

  
}

module.exports = DishesController;