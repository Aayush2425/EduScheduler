const express = require("express");
const router = express.Router();
const {
  getAdmin,
  signupAdmin,
  signinAdmin,
  updateAdmin,
} = require("../controller/AdminController");

// Update Admin
router.get("/:id", getAdmin);
router.post("/signup", signupAdmin);
router.post("/signin", signinAdmin);
router.put("/:id", updateAdmin);

module.exports = router;
