const { validateToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('No authorization header');

  const headerValues = authHeader.split(' ');
  if (headerValues.length !== 2 || headerValues[0] !== 'Bearer')
    return res.status(401).send('Without authorization Bearer');

  const payload = validateToken(headerValues[1]);
  if (!payload) {
    return res.status(401).send('Invalid token');
  }
  req.user = payload.user;
  return next();
};
