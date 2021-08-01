const mongoose = require("mongoose");
const UserCollection = require("../db/models/users.models");

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.user;

    await UserCollection.findOneAndDelete({ _id });

    return res.redirect("/");
  } catch (error) {
    printF.log(error, "Internal Server error !");

    return res.status(500).json({ message: `Internal Server error !` });
  }
};

module.exports = deleteUser;
