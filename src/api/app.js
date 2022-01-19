const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const userControllers = require('../controllers/userControllers');
const recipeControllers = require('../controllers/recipesControllers');
const { authValidate } = require('./auth/validateJwt');
const error = require('./middlewares/errosMid');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });

app.post('/users', userControllers.getUserController);
app.post('/login', userControllers.getLoginController);
app.post('/recipes', authValidate, recipeControllers.createRecipesCont);
app.get('/recipes', recipeControllers.getAllCont);
app.get('/recipes/:id', recipeControllers.getByIdCont);
app.put('/recipes/:id', authValidate, recipeControllers.updateRecipeCont);
app.delete('/recipes/:id', authValidate, recipeControllers.deleteRecipeCont);
app.put('/recipes/:id/image', authValidate, upload.single('image'), recipeControllers.addImage);

app.use(error);

module.exports = app;
