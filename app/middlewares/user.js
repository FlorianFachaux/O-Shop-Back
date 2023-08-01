const jwt = require('jsonwebtoken');

// Middleware user to verify the user connection
const userMiddleware = (req, res, next) => {
  try {
    // Save token from headers (sent by Front end 'Bearer xxx')
    // In order to get the token only, we split et take the 2nd value of array (index 1)
    const token = req.headers.authorization.split(' ')[1];
    // In order to get infos from user, we can decode it with .verify
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    // If no token created, error 401 (token null)
    res.status(401).json(error.toString());
  }
};

module.exports = userMiddleware;
