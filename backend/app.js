require("dotenv").config({ path: ".dotenv" });
const http = require("http");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const { getHttpsCredentials } = require("./lib/httpsUtil");
const { setupRoutes } = require("./routes/appRoutes");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
setupRoutes(app);

const HTTP_PORT = process.env.ENV === "PROD" ? 80 : 5000;
const HTTPS_PORT = process.env.ENV === "PROD" ? 443 : 5001;

http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on port ${HTTP_PORT}`);
});
if (process.env.ENV === "PROD") {
  https.createServer(getHttpsCredentials(), app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
  });
}

module.exports = { app };
