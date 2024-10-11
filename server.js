//initializes express api
const express = require("express"); //uses express middleware
const app = express();

//parses incoming data for readability
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//handlebars functions

const { engine } = require("express-handlebars");

app.engine(
  "handlebars",
  engine({
    helpers: {},
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.enable("view cache");

//serves static assets
app.use(express.static("./app"));

//serves app routes
const appRoutes = require("./api/routes/appRoutes"); //serves HTML pages
app.use("/", appRoutes);

//serves 404 error page
app.get("*", (req, res) => {
  res.render("error");
});

//initializes server
const PORT = process.env.PORT || 5959;
app.listen(PORT, function () {
  console.log(`*****  Back Together Foundation Dashboard is Running  *****
    **************************
    App listening on PORT ${PORT}`);
});

// For app termination
const gracefulShutdown = (msg, callback) => {
  console.log(`Application disconnected through ${msg}`);
  callback();
};
process.on("SIGINT", () => {
  gracefulShutdown("App termination", () => {
    process.exit(0);
  });
});
