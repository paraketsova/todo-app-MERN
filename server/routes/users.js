var express = require('express');
var router = express.Router();
const Users = require("../models/usersModel");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const user = await Users.find();
  res.json(user);
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const user = await Users.findOne({ _id: id });
  res.statusCode = 200;
  res.json(user);
});

module.exports = router;

