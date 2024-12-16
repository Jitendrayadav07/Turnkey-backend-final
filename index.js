// import module/package
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const { Turnkey } = require("@turnkey/sdk-server");
// setting middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
require("dotenv").config();

const routes = require("./routes");


// Use routes
app.use("/v2", routes);

const PORT = process.env.PORT || 45000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});