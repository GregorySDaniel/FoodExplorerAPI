const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class DishesController {
  async create(req, res){
    const { name, category, description, ingredients, price } = req.body;
    const dish_img = req.file.filename;

    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(dish_img);

    if(!name || !description || !price || !category ) {
      throw new AppError("Preencha todas as informações obrigatórias sobre o prato.", 401);
    }

    
    const [dish_id] = await knex('dishes').insert({
      name,
      category,
      description,
      price,
      image : filename
    });

    if(ingredients){
      const ingredientsInsert = ingredients.map((ingredient) => {
        return{
          dish_id,
          name: ingredient
        }
      });
      await knex('ingredients').insert(ingredientsInsert);
    }

    return res.json({name, category, description, ingredients, price, filename});
  }

  async show(req, res){
    const { id } = req.params;

    const dish = await knex('dishes').where({id}).first();
    const ingredients = await knex('ingredients').where({dish_id : id}).orderBy("name");

    return res.json({
      ...dish,
      ingredients
    });
  }

  async delete(req, res){
    const { id } = req.params;
    const dish = await knex('dishes').where({ id }).first();

    if (!dish) {
      throw new AppError('Prato não existe mais', 401);
    }

    const diskStorage = new DiskStorage();
    await diskStorage.deleteFile(dish.image);

    await knex('dishes').where({ id }).delete();

    return res.json();
  }

  async index(req, res){
    const { name } = req.query;
    
    let dishes;

    if(name){
      dishes = await knex('dishes').whereLike("name", `%${name}%`);
    } else {
      dishes = await knex('dishes');
    }
    

    return res.json(dishes);
  }
}

module.exports = DishesController;