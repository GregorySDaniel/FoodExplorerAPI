const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class DishesController {
  async create(req, res){
    const { name, category, description, ingredients, price } = req.body;

    

    res.json({name, category, description, ingredients, price});
  }
}

module.exports = DishesController;