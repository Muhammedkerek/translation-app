const express = require("express");
const router = express.Router();
const multer = require("multer")
const translatorController = require("../controllers/translatorController");


router.route("/").get(translatorController.renderHomePage);
router.route("/login").get(translatorController.renderLoginPage);
router.route("/signup").get(translatorController.rendersignUpPage);


router.post("/save-audio-text", translatorController.saveAudioText);
module.exports = router;