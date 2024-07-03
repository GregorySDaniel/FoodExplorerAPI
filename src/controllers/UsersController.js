const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');
const sqliteConnection = require('../database/sqlite');

class UsersController {
  async create(req, res){
    const { name, email, password } = req.body;

    if(!name){
      throw new AppError("Nome é obrigatório");
    }

    const db = await sqliteConnection();
    const checkUserExists = await db.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkUserExists){
      throw new AppError("Usuário ja cadastrado");
    }

    const hashedPassword = await hash(password, 8);

    await db.run("INSERT INTO users (name, email, password) VALUES ((?),(?),(?))", [name, email, hashedPassword]);

    return res.json();
  }

}

module.exports = UsersController;