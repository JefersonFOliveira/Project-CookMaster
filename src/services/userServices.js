const userModels = require('../models/userModels');
const errorMes = require('../api/utils/errorMes');

const validateUser = (name, email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (!name || !email || !password || emailRegex.test(email) === false) return true;
  return false;
};

const createUserService = async (name, email, password) => {
  console.log(validateUser(name, email, password));
  if (validateUser(name, email, password)) {
    throw errorMes(400, 'Invalid entries. Try again.');
  }

  const userEmail = await userModels.findByEmail(email);
  if (userEmail) throw errorMes(409, 'Email already registered');
  
  const user = await userModels.createUser(name, email, password);
  return user;
};

module.exports = {
  createUserService,
};
