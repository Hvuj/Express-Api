const express = require("express");
const app = express();
const routes = require("./routes/routes");
const logger = require("./middleware/logger");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const port = process.env.port || 5000;
const members = require("./modules/members");
mongoose.set("useCreateIndex", true);

//connect to mongoose
mongoose.connect("mongodb://localhost/members", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", routes);

// Handlebars Middleware
app.set("view engine", "hbs");
app.engine("hbs", handlebars({ defaultLayout: "main", extname: "hbs" }));

// Homepage Route
app.get("/test", (req, res, next) =>
  res.render("main", {
    layout: "index",
    title: "Member App",
    members,
  })
);

//error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(422).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`server is up on port: ${port}`);
});
