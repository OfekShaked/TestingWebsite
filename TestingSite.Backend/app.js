const express = require("express");
const app = express();
const questionRouter = require("./routes/questionRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const Urls = require("./settings/staticUrls");
const Database = require("./DAL/mongo_context");

Database.connect('testing_site');
app.use(cors());
app.listen(Urls.serverPort, () =>
  console.log(
    `Testing Site server is running at ${Urls.serverDomain}:${Urls.serverPort}`
  )
);

app.use(bodyParser.json());

app.use("/api/Questions", questionRouter);
