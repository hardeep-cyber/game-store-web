const { connect } = require("mongoose");
const chalk = require("chalk");
const mongoose = require("mongoose");

const dbURI = `${process.env.DB_HOST}${process.env.DB_USER}`;

const ConnectDB = async () => {
  try {
    await connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(chalk.black.bgGreen.bold("MongoDB connected !"));
  } catch (err) {
    console.log(chalk.black.bgRed.bold("Failed to connect to MongoDB", err));
  }
};

ConnectDB();

const conn = mongoose.connection;

module.exports = { conn };
