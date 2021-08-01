const bcrypt = require("bcryptjs");
const UserCollection = require("../db/models/users.models");

const addtocart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const { productName, address, otherDetails } = req.body;

    const user = await UserCollection.findById(userId);

    if (!user) return res.status(401).json({ message: "user Not Found !" });

    user.cart = user.cart.concat({ productName, address, otherDetails });

    const isSaved = await user.save();
    if (isSaved) {
      return res.status(200).json({
        message: "Your product is added to cart successfully !",
      });
    }
  } catch (error) {
    return res.status(401).send({ message: "Some thing want wrong !", error });
  }
};

module.exports = addtocart;
