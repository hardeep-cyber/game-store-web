const express = require("express");
const auth = require("../middleware/auth");
const view = new express.Router();

const initViewRoute = (app) => {
  view.get("/", auth, (req, res) => {
    if (req.user) {
      res.render("index", {
        hideUserCreation: "hidden",
        userId: req.user._id,
        isLoggedIn: true,
      });
    } else {
      res.render("index", {
        hideCart: "hidden",
        bookYourOrder: "hidden",
        isLoggedIn: false,
      });
    }
  });

  view.get("/signin", auth, (req, res) => {
    if (req.user) {
      res.redirect("/");
    } else res.render("signin");
  });

  view.get("/signup", auth, (req, res) => {
    if (req.user) {
      res.redirect("/");
    } else res.render("signup");
  });

  view.get("/cart", auth, (req, res) => {
    if (!req.user) {
      res.redirect("/signin");
    }
    const cart = req.user.cart;
    let cartHtml = "";
    for (let index = 0; index < cart.length; index++) {
      const element = `
      <div class="card main-cart-card">
        <div class="card-header heading">
        <h3 style="color: #dc3545">
          Product
        </h3>
        </div>
        <div class="card-body">
          <div class="input-group mb-3">
            <label class="col-sm-7 col-form-label">Product Name</label>
            <div class="input-group row-sm-10">
            <h4>${cart[index].productName}</h4>
            </div>
          </div>
          <div class="input-group mb-3">
            <label class="col-sm-2 col-form-label">Address</label>
            <div class="input-group row-sm-10">
              <h5>${cart[index].address}</h5>
            </div>
          </div>
          <div class="input-group mb-3">
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="input-group col-sm-10">
            <h5>${cart[index].otherDetails}</h5>
            </div>
          </div>
        </div>
      </div>
      `;
      cartHtml += element;
    }
    res.render("cart", {
      hideUserCreation: "hidden",
      userId: req.user._id,
      cartCards: cartHtml,
      name: req.user.firstName + " " + req.user.lastName,
      gender: req.user.gender,
      email: req.user.email,
    });
  });

  return app.use("/", view);
};

module.exports = initViewRoute;
