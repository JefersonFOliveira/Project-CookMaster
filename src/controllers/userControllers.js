const userService = require('../services/userServices');

const userController = async (req, res, next) => {
 try {
   const { name, email, password } = req.body;
   const user = await userService.createUserService(name, email, password);
   return res.status(201).json(user);
 } catch (error) {
   next(error);
 }
};

module.exports = {
  userController,
};
