const { Router } = require('express');
const UsersController = require('../controllers/UsersController');
const ValidateUserController = require('../controllers/ValidateUserController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const userscontroller = new UsersController();
const validateUserController = new ValidateUserController();

const usersRoutes = Router();

usersRoutes.post("/", userscontroller.create);
usersRoutes.get("/validated", ensureAuthenticated, validateUserController.index);

module.exports = usersRoutes;