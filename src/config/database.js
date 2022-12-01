const mongoose = require("mongoose");
const winston = require("winston");
// const config = require('config');
// const dbIP = config.get('dbIP');
// const dbName = config.get('dbName');
// const dbUserName = config.get('dbUserName');
// const dbPassword = config.get('dbPassword');

// const mongoURI = `mongodb://${dbIP}/${dbName}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
// const mongoURI = `mongodb://${dbUserName}:${dbPassword}@${dbIP}/${dbName}`;

//mongodb://43.204.84.1:27017/dev_mindwavedb
const connectDB = async () => {
  try {
    // await mongoose.connect('mongodb://ec2-43-204-84-1.ap-south-1.compute.amazonaws.com:27017/dev_mindwavedb', {
    await mongoose.connect("mongodb://127.0.0.1:27017/dev_mindwaved", {
      // user: dbUserName,
      // pass: dbPassword,
      // useCreateIndex: true,
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    // mongoose.set('useFindAndModify', false);
    winston.info("connected to mongodb");
    console.log("connected DB")
  } catch (err) {
    winston.error(err.message);

    process.exit(1);
  }
};
module.exports = connectDB;
