const { Router } = require('express');
const DishesController = require('../controllers/DishesController');
const multer = require('multer');
const uploadConfig = require('../configs/upload');
const verifyUserAuthorization = require('../middleware/verifyUserAuthorization');

const upload = multer(uploadConfig.MULTER);


const dishesController = new DishesController();
const dishesRoutes = Router();

dishesRoutes.post('/', upload.single("image"), verifyUserAuthorization('admin'), dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.delete('/:id', verifyUserAuthorization('admin'), dishesController.delete)


module.exports = dishesRoutes;
