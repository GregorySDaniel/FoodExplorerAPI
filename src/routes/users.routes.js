const { Router } = require('express');
const UsersController = require('../controllers/UsersController');
const userscontroller = new UsersController();

const usersRoutes = Router();

usersRoutes.post("/", userscontroller.create);

module.exports = usersRoutes;