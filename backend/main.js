require("dotenv").config({ path: "./.dotenv" });
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const signUpRouter = require("./routes/signup");

const app = express();

let credentials;

// Certificate
if (process.env.ENV === "PROD") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/mypantry.space/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/mypantry.space/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/mypantry.space/chain.pem",
    "utf8"
  );

  credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  // set up a route to redirect http to https
  http.get("*", function (req, res) {
    res.redirect("https://" + req.headers.host + req.url);

    // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
    // res.redirect('https://example.com' + req.url);
  });
}
app.use(bodyParser.json());
app.use(signUpRouter);

app.use((req, res) => {
  res.send("Hello there !");
});

app.post("/signup", function (req, res) {});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.ENV === "PROD" ? 80 : 5000, () => {
  console.log("HTTP Server running on port 80");
});

httpsServer.listen(process.env.ENV === "PROD" ? 443 : 5001, () => {
  console.log("HTTPS Server running on port 443");
});
