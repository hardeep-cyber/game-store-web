const jwt = require("jsonwebtoken");
const UserCollection = require("../db/models/users.models");

const auth = async (req, res, next) => {
  const token =
    req.body.jwt ||
    req.query.jwt ||
    req.headers["x-access-token"] ||
    req.cookies.jwt;

  try {
    if (!token) {
      req.user = null;
      return next();
      //   return res.status(401).send("Unauthorized: No token provided");
    }
    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserCollection.findOne({ _id: verifiedUser._id });

    if (!user) {
      req.user = null;
      return next();
      //   return res.status(401).send("Unauthorized: No token provided");
    }
    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    req.user = null;
    return next();
  }
};

module.exports = auth;
