const express = require("express");
const { updateResource, getAllResource, createResource } = require("../controller/ResourceController.js");
const router = express.Router();

// Update Resource
router.post("/createresource" , createResource);
router.put("/:id", updateResource);
router.get("/:uniName/get-all-resources", getAllResource);

module.exports = router;
