const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');
const knex = require('../database/knex');

class UsersController {
  async create(req, res){
    const { name, email, password } = req.body;

    if(!name){
      throw new AppError("Nome é obrigatório");
    }

    const checkUserExists = await knex('users').select('*').where('email', email);

    if(checkUserExists.length>0){
      throw new AppError("Usuário ja cadastrado");
    }

    const hashedPassword = await hash(password, 8);

    await knex('users').insert({
      name,
      email,
      password : hashedPassword,
    });

    return res.json();
  }

}

module.exports = UsersController;