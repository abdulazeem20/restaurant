const express = require("express");
const router = express.Router();
const path = require("path");
const { validationResult } = require("express-validator");
const { userLoginValidation } = require("../class/validator");
const { userSession } = require(path.resolve("middleware", "userSession"));
const { userRegistrationValidation } = require(path.resolve(
  "class",
  "validator"
));
const Foods = require(path.resolve("class", "Foods"));
const User = require(path.resolve("class", "User"));

const food = new Foods();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/menu", (req, res) => {
  res.render("menu");
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.post("/category", async (req, res) => {
  res.json(await food.getAllCategories());
});

router.post("/allfoods", async (req, res) => {
  res.json(await food.getAllFoods());
});

router.post("/update_quantity/:id/:num", async (req, res) => {
  res.json(
    await food.updateQuantity(req.params.id, req.params.num, req.session.email)
  );
});

router.post("/foods/:cat", async (req, res) => {
  res.json(await food.getSpecificFoods(req.params.cat));
});

router.post("/add_to_cart/:id", userSession, async (req, res) => {
  res.json(await food.addToCart(req.params.id, req.session.email));
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

router.post("/session", (req, res) => {
  res.json(req.session.email ? { session: true } : { session: false });
});

router.post("/delete_from_cart/:id", userSession, async (req, res) => {
  res.json(await food.deleteFromCart(req.params.id, req.session.email));
});

router.post("/food_detail/:id", async (req, res) => {
  res.json(await food.getFoodDetail(req.params.id));
});

router.post("/in_cart", async (req, res) => {
  req.session.email
    ? res.json(await food.getFoodsInCart(req.session.email))
    : res.json([{ success: true }]);
});

router.post("/number_in_cart", async (req, res) => {
  req.session.email
    ? res.json(await food.getTotalNumberOfFoodsIncart(req.session.email))
    : res.json([{ total: 0 }]);
});

router.post("/register", userRegistrationValidation(), async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    res.json({ errors: validationResult(req).errors });
    return;
  }
  const user = new User(req.body);
  const emailExists = await user.checkIfExists("email", req.body.email);
  if (emailExists > 0) {
    res.json({
      errors: [
        {
          msg: "Email Already Exists",
          param: "email",
        },
      ],
    });
    return;
  }
  let save = user.saveUser();
  if (save) {
    req.session.email = req.body.email;
    res.json({ success: "success" });
  }
});

router.post("/login", userLoginValidation(), async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    res.json({ errors: validationResult(req).errors });
    return;
  }
  const user = new User(req.body);
  let detail = await user.getUser();
  let field = [];
  for (data in req.body) {
    field.push(data);
  }
  if (detail.length == 0 || detail[0].password !== req.body.password) {
    let response = {
      error: "Invalid Username or Password",
      field: `${field}`,
    };
    res.json(response);
    return;
  }
  req.session.email = req.body.email;
  res.json({ success: true });
});

module.exports = router;
