const express = require("express");
const router = express.Router();

const translatorController = require("../controllers/translatorController");

router.route("/").get(translatorController.renderHomePage);
module.exports = router;