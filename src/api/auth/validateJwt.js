const jwt = require('jsonwebtoken');
require('dotenv').config();
const { findByEmail } = require('../../models/userModels');

const secret = 'segredo';

const authValidate = async (req, res, next) => {
const token = req.headers.authorization;
  try {
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    const payload = jwt.verify(token, secret);
    
    const user = await findByEmail(payload.email);
    // console.log(user);
    if (!user) return res.status(401).json({ message: 'jwt malformed' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { authValidate };
