const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  winston.add(new winston.transports.File({ filename: "logfile.log" }));

  winston.add(
    new winston.transports.MongoDB({
      // db:'mongodb://ec2-43-204-84-1.ap-south-1.compute.amazonaws.com:27017',
      db: "mongodb://127.0.0.1:27017/dev_mindwavedb",
      level: "info",
    })
  );
  //
  // throw new Error('something failed during startup')
};
