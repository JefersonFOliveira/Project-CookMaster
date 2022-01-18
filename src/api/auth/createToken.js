const jwt = require('jsonwebtoken');

const secret = 'segredo';

const createToken = (user) => {
  const { password: _, ...payload } = user;
  const jwtConfig = {
    expiresIn: '14d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  return { token };
};

module.exports = { createToken };