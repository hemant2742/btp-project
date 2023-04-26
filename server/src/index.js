const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongo = require("./helpers/mongo");
const bodyParser = require("body-parser");
const { encryptData, decryptData } = require("./helpers/crypto");
const { crypto } = require("./routes");

function server() {
  const app = express();
  const http = require("http").Server(app);

  app.use(morgan("combined"));
  app.use(bodyParser.json({}));
  app.use(cookieParser());

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      allowedHeaders: ["content-type"],
    })
  );

  app.use("/crypto", crypto);

  app.use("*", function (req, res) {
    res.status(404).json({
      error: "api.NOT_FOUND",
      message: "API not found",
    });
  });

  http.listen(8080, () => {
    console.log("port is %d", 8080);
    console.log("Listening on %d", 8080);
  });
}

async function boot() {
  await mongo.connect();
  console.log("Mongo connected");
  server();
}

boot().catch((ex) => {
  console.log(ex);
  process.exit(1);
});
