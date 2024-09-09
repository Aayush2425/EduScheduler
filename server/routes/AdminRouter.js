const express = require("express");
const {
  updateAdmin,
  getAdmin,
  signupAdmin,
  signinAdmin,
} = require("../controller/AdminController.js");
const router = express.Router();

// Update Admin
router.get("/", getAdmin);
router.post("/signup", signupAdmin);
router.post("/signin", signinAdmin);
router.put("/:id", updateAdmin);

module.exports = router;
