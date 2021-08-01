const express = require("express");
const addtocart = require("../controllers/addtocart.controller");
const deleteUser = require("../controllers/deleteUser.controller");
const logout = require("../controllers/logout.controller");
const signIn = require("../controllers/signin.controller");
const signUp = require("../controllers/signup.controller");
const auth = require("../middleware/auth");
const user = new express.Router();

const initUserRoute = (app) => {
  user.post("/signUp", signUp);
  user.post("/signIn", signIn);
  user.post("/addtocart/:userId", addtocart);
  user.get("/logout", auth, logout);
  user.get("/delete", auth, deleteUser);

  return app.use("/api/user", user);
};

module.exports = initUserRoute;
