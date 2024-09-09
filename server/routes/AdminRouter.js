const express = require("express");
const { updateAdmin, getAdmin } = require("../controller/AdminController.js");
const router = express.Router();
const {
  signupAdmin,
  signinAdmin,
  updateAdmin,
} = require("../controller/AdminController");

// Update Admin
router.get("/", getAdmin);
router.post("/signup", signupAdmin);
router.post("/signin", signinAdmin);
router.put("/:id", updateAdmin);

module.exports = router;
