import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");
// Middleware to differentiate admins from participants
const isAdmin = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    res.status(401).json({ error: "Access token missing" });
  } else {
    try {
      console.log("new new 1", accessToken);
      const user = jwt.verify(accessToken, "secret_key");
      const { role } = user;
      console.log("new new 2", user);
      if (role !== "admin") {
        res.status(403).json({ error: "Unauthorized access" });
      } else {
        // res.locals.email = user.email;
        next();
      }
    } catch (err) {
      console.log("eror message", err);
      res.status(401).json({ error: err.message });
    }
  }
};

export default isAdmin;
