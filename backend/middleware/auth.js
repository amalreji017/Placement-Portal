const jwt = require("jsonwebtoken");
const User = require("../models/adminmodel");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.json({result: false, error: 'NOT AUTHORIZED'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.json({result: false, error: 'NO USER FOUND'});
    }

    req.user = user;

    next();
  } catch (err) {
    return res.json({result: false, error: 'NOT AUTHORIZED'});
  }
};