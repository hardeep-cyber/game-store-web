const UserCollection = require("../db/models/users.models");

require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const data = req.body;
    const { firstName, lastName, gender } = data;
    const { email, password } = data;
    const isUserExist = await UserCollection.findOne({ email: email });

    if (isUserExist)
      return res.status(422).json({ message: "Email already exist !" });

    const userAccount = new UserCollection({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      password: password,
    });

    const token = await userAccount.generateAuthToken();

    const user = await userAccount.save();
    if (user) {
      return res
        .status(201)
        .cookie("jwt", token, {
          maxAge: 28 * 24 * 60 * 60 * 1000 * 2,
          httpOnly: true,
        })
        .json({
          message: "Game Store Account created successfully !",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server error !" });
  }
};

module.exports = signUp;
