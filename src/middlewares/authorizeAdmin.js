const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  console.log(req.user.role);
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};

module.exports = authorizeAdmin;