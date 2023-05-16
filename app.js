require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/authMiddleware");
const { checkUser } = require("./middleware/authMiddleware");
const siteRoutes = require("./routes/siteRoutes");

const app = express();

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PWD}@banquinho.b9frcyb.mongodb.net/node-auth`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/sobre", (req, res) => res.render("sobre"));
app.use("/produto", siteRoutes);
app.use("/", authRoutes);
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
