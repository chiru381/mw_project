const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
// const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerDocument = require("./src/config/swagger.json");
const Userroutes = require("./src/routes/users.route");
const connectDB = require("./src/config/database");


require("./src/utils/logger")();
const error = require("./src/middleware/error");

const app = express();
// const swaggerSpec = swaggerJSDoc(swaggerDocument);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

app.use(error);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", Userroutes);

app.get("/", (req, res) => {
  res.send("<h1>Mindwave Application</h1>");
});

connectDB();

const PORT = 4313;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
