const bcrypt = require("bcryptjs");
const UserCollection = require("../db/models/users.models");

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserCollection.findOne({ email: email });

    if (!user)
      return res.status(401).json({ message: "Invalid Email or Password !" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return res.status(401).json({ message: "Invalid Email or Password !" });

    const token = await user.generateAuthToken();

    return res
      .status(200)
      .cookie("jwt", token, {
        maxAge: 28 * 24 * 60 * 60 * 1000 * 2,
        httpOnly: true,
      })
      .json({
        message: "Sign in successfully !",
      });
  } catch (error) {
    return res.status(401).send({ message: "Some thing want wrong !" });
  }
};

module.exports = signIn;
