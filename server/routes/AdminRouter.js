const express = require("express");
const router = express.Router();
const {
  updateAdmin,
  getAdmin,
  signupAdmin,
  signinAdmin,
  updateAdmin,
  getAdmin
} = require("../controller/AdminController");

// Update Admin
router.get("/", getAdmin);
router.post("/signup", signupAdmin);
router.post("/signin", signinAdmin);
router.put("/:id", updateAdmin);

module.exports = router;
