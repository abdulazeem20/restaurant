const express = require("express");
const path = require("path");
const session = require("express-session");
const userRoute = require("./route/user");
const receptionistRoute = require("./route/receptionist");

const app = express();

app.set("view engine", "ejs");

app.use("/assets", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", userRoute);
app.use("/receptionist", receptionistRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
