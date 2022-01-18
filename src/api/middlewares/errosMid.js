const error = (err, _req, res, _next) => {
  if (err.status) {
    const { status, message } = err;

    return res.status(status).json({ message });
  }
  return res.status(400).json({ message: 'Internal Error' });
};

module.exports = error;