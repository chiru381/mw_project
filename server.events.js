const express = require("express");
const bodyParser = require("body-parser");
const EventEMitter = require("events");
const cors = require("cors");
const helmet = require("helmet");

require("./src/routes/users.route");

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

const { User } = require("./src/models/user.models");
const Stream = new EventEMitter();
const connectDB = require("./src/config/database");

const req = require("express/lib/request");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/live-data", async (request, response) => {
  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Connection", "keep-alive");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.flushHeaders();

  Stream.on("push", async (event) => {
    let user = await User.find({});
    response.write(
      "event: " +
        String(event) +
        "\n" +
        "data: " +
        JSON.stringify(user) +
        "\n\n"
    );
  });

  setInterval(() => {
    Stream.emit("push", "getAllUsers", {});
  },  1000);
});
connectDB();

app.get("/", (req, res) => {
  res.send("<h1> Application</h1>");
});
connectDB();
const PORT = 9000;

app.listen(PORT, () => {
  console.log("info", `Server started on PORT ${PORT}`);
});
