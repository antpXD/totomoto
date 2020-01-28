//just a function that has an access to reqest and response cycle and object

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Get the token (x-auth-token) from the header
  const token = req.header("x-auth-token");

  //if token doesn't exist
  if (!token) {
    return res.status(401).json({ msg: "No token, autorization denied." });
  }

  try {
    //if there is a token - we pull out the payload (which is in decoded)
    //(config.get to jest secret potrzebny w tokenie, ktory jest w default.json)
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //set user that is in payload (in decoded variable) to request.user, so that we will have an access to this inside the route - route.post(... asyns (req, res))
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
