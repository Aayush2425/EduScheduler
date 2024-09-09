const express = require("express");
const { updateResource } = require("../controller/ResourceController.js");
const router = express.Router();

// Update Resource
router.put("/:id", updateResource);

module.exports = router;
