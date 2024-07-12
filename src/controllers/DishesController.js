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
      if(ingredients.lenght > 1){
        const ingredientsInsert = ingredients.map((ingredient) => {
          return{
            dish_id,
            name: ingredient
          }
        });
        await knex('ingredients').insert(ingredientsInsert);
      } else {
        await knex('ingredients').insert(ingredients);
      }
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

    if (name) {
      dishes = await knex('dishes')
        .leftJoin('ingredients', 'dishes.id', 'ingredients.dish_id')
        .where('dishes.name', 'like', `%${name}%`)
        .orWhere('ingredients.name', 'like', `%${name}%`)
        .select('dishes.*')
        .distinct();
    } else {
      dishes = await knex('dishes');
    }
    

    return res.json(dishes);
  }

  async patch(req, res){
    const { name, category, description, ingredients, price } = req.body;
    const { id } = req.params;

    if(req.file){
      const dish_img = req.file.filename;
      const diskStorage = new DiskStorage();
      const filename = await diskStorage.saveFile(dish_img);
      await knex('dishes')
      .where({ id })
      .update({
        image: filename
      });
    }

    if(!name || !description || !price || !category ) {
      throw new AppError("Preencha todas as informações obrigatórias sobre o prato.", 401);
    }

    await knex('dishes')
      .where({ id })
      .update({
        name,
        category,
        description,
        price,
      });

      await knex('ingredients').where({ dish_id: id }).delete();
      if(ingredients){
      const ingredientsInsert = ingredients.map((ingredient) => {
        return{
          dish_id: id,
          name: ingredient
        }
      });
      await knex('ingredients').insert(ingredientsInsert);
    }

    return res.json({name, category, description, ingredients, price });
  }
}

module.exports = DishesController;