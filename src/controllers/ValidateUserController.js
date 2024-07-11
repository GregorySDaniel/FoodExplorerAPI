const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class ValidateUserController{
  async index(req, res){
    const { user } = req;
    console.log(user)
    const checkIfUserExists = await knex('users').where({id: user.id});

    if(checkIfUserExists === 0){
      throw new AppError('Não Autorizado', 401)
    }
    return res.json()
  }
}

module.exports = ValidateUserController;