const express = require("express");
const app = express();
const questionsRouter = require("./routes/question_routes");
const organizationRouter = require("./routes/organization_routes");
const testRouter = require("./routes/test_routes");
const topicRouter = require("./routes/topic_routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const Urls = require("./settings/staticUrls");
const Database = require("./DAL/mongo_context");

Database.connect('testing_site');
app.use(cors());
app.listen(Urls.serverPort, () =>
{
  console.log(
    `Testing Site server is running at ${Urls.serverDomain}:${Urls.serverPort}`
  );
});

app.use(bodyParser.json());

app.use("/api/Questions", questionsRouter);

app.use("/api/Organizations", organizationRouter)

app.use("/api/Tests", testRouter);

app.use("/api/Topics", topicRouter);

