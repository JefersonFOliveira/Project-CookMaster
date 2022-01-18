const userService = require('../services/userServices');

const getUserController = async (req, res, next) => {
 try {
   const { name, email, password } = req.body;
   const user = await userService.createUserService(name, email, password);
   return res.status(201).json(user);
 } catch (error) {
   next(error);
 }
};

const getLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUserService(email, password);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserController,
  getLoginController,
};
