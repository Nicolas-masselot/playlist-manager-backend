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

const corsOptions = {
  origin: ["https://playlist-manager-admin.herokuapp.com/", "https://playlist-manager-user.herokuapp.com/"],
  preflightContinue:false,
  credentials: true
}

app.use(cors(corsOptions));


app.use("/", routes);
app.use(express.static("./adverts"));

app.listen(apiPort, () => {
    console.log(`Server is listening on port ${apiPort}`);
});