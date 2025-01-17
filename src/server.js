require('dotenv/config')
require('express-async-errors');

const express = require('express');
const AppError = require('./utils/AppError');
const uploadConfig = require('./configs/upload');
const cookieParser = require('cookie-parser');

const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://main--gregfoodexplorer.netlify.app'],
  credentials: true
}));
app.use(cookieParser())
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));
app.use(express.json());
app.use(routes);


app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  
  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

