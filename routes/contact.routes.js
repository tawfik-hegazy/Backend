const express = require("express");
const { sendMessage } = require("../controllers/contactus.controllers");

const router = express.Router();

router.post("/send", sendMessage);

module.exports = router;
