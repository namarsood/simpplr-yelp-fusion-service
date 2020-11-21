const express = require("express");
const app = express();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const responseTime = require("response-time");
const PORT = require("./config/constants").PORT;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Yelp API Documentation",
      contact: {
        name: "Namardeep Sood",
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  responseTime(function (req, res, time) {
    console.log(`${req.method} ${res.statusCode} ${req.url}`, time, "ms");
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("./routes/yelp-fusion")(app);

app.get("/v1/liveness", function (req, res) {
  res.send("Welcome to simpplr yelp fusion");
});

const server = app.listen(PORT, async () => {
  console.log("server is running on port ", PORT);
});

process.on("SIGINT", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
  });
});

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
  });
});
