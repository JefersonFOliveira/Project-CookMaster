const connection = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return { user: { name, email, role: 'user', _id: user.insertedId } };
};

const findByEmail = async (email) => {
  const db = await connection();
  const userEmail = await db.collection('users').findOne({ email });
  console.log(userEmail);
  return userEmail;
};

module.exports = {
  createUser,
  findByEmail,
};
