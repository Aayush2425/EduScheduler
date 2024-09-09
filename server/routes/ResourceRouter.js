const express = require("express");
const { updateResource, createResource } = require("../controller/ResourceController.js");
const router = express.Router();

// Update Resource
router.post("/createresource" , createResource);
router.put("/:id", updateResource);

module.exports = router;
