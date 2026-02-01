const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ success: false, error: { message: 'no token' } });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, error: { message: 'no token' } });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token or token expired' },
      });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;
