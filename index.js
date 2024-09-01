const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const router = require("./routes");

require("./config/db");
const app = express();
const port = 8080;

app.use(cors());

// middleware
app.use(loggerMiddleware);

// To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));
// To parse json data
app.use(bodyParser.json());

// Simple request time logger
app.use((req, res, next) => {
  

  // This function call tells that more processing is
  // required for the current request and is in the next middleware
  next();
});

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
