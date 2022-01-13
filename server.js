const express = require("express");
const { connect: dbconnect } = require("./src/db");
const { apiPort } = require("./src/config");
const routes = require("./src/routes");
const bodyParser = require("body-parser");
// Connect to the database
dbconnect();

// Create the server
const app = express();

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
// app.get("/", (req, res) => res.send("Hello World"));
const cors = require("cors");

/*let whitelist = ["https://playlist-manager-admin.herokuapp.com/", "https://playlist-manager-user.herokuapp.com/"];*/

const allowedOrigins = ["https://playlist-manager-admin.herokuapp.com/", "https://playlist-manager-user.herokuapp.com/"];
app.use(function(req, res, next) {
  let origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use("/", routes);
app.use(express.static("./adverts"));

app.listen(apiPort, () => {
    console.log(`Server is listening on port ${apiPort}`);
});