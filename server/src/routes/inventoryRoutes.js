const express = require("express");
const router = express.Router();
const { getInventory, createItem, updateStock, updateItem, deleteItem } = require("../controllers/inventoryController");
const { protect, requirePermission } = require("../middleware/auth");

router.use(protect);
router.use(requirePermission("manage_inventory"));

router.get("/", getInventory);
router.post("/", createItem);
router.patch("/:inventoryId/stock", updateStock);
router.patch("/:inventoryId", updateItem);
router.delete("/:inventoryId", deleteItem);

module.exports = router;
