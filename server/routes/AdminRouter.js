const express = require("express");
const { updateAdmin } = require("../controller/AdminController.js");
const router = express.Router();

// Update Admin
router.put("/:id", updateAdmin);

module.exports = router;
