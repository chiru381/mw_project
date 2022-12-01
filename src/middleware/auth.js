const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "s_key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateToken(user_id) {
  return jwt.sign({ data: user_id }, "s_key", { expiresIn: "1h" });
}
// jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
//     console.log(token);
//   });
module.exports = {
  authentication,
  generateToken,
};
