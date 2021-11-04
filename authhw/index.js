const express = require("express");
const bodyParser = require("body-parser");
// const auth = require("../middleware/auth");

const db = require("./config/db");
const user = require("./routes/user");
const shop = require("./routes/shop");

const app = express();

// PORT

const PORT = process.env.PORT || 4000;

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);

app.use("/shop", shop);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});