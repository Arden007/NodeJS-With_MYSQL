const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) res.sendStatus(401).send("Failed Authorization");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(403);
    req.user = user;
    console.log(process.env.ACCESS_TOKEN_SECRET)
    next();
  });
}

module.exports = authenticateToken;
