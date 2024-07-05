const { Router } = require('express');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const usersRoutes = require('./users.routes')
const dishesRoutes = require('./dishes.routes')
const sessionRoutes = require('./session.routes')

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/session', sessionRoutes);
routes.use('/dishes', ensureAuthenticated, dishesRoutes);


module.exports = routes;
