const { Router } = require('express');
const DishesController = require('../controllers/DishesController');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const upload = multer(uploadConfig.MULTER);


const dishesController = new DishesController();
const dishesRoutes = Router();

dishesRoutes.post('/', upload.single("image"), dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.delete('/:id', dishesController.delete)


module.exports = dishesRoutes;
