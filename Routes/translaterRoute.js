const express = require("express");
const router = express.Router();

const translatorController = require("../controllers/translatorController");

router.route("/").get(translatorController.renderHomePage);
router.route("/login").get(translatorController.renderLoginPage);
router.route("/signup").get(translatorController.rendersignUpPage);
module.exports = router;