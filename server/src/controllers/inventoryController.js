const Inventory = require("../models/Inventory");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/** GET /api/inventory */
const getInventory = async (req, res, next) => {
  try {
    const filter = { salonId: req.manager.salonId };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;

    const items = await Inventory.find(filter).sort({ category: 1, productName: 1 });
    return sendSuccess(res, { inventory: items, count: items.length });
  } catch (err) {
    next(err);
  }
};

/** POST /api/inventory */
const createItem = async (req, res, next) => {
  try {
    const { productName, category, quantity, unit, lowStockThreshold, purchasePrice, supplier } = req.body;

    if (!productName || !category || quantity == null || !unit || purchasePrice == null) {
      throw new ApiError("productName, category, quantity, unit, and purchasePrice are required.", 400);
    }

    const count = await Inventory.countDocuments({ salonId: req.manager.salonId });
    const inventoryId = `INV-${String(count + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

    const item = await Inventory.create({
      inventoryId,
      salonId: req.manager.salonId,
      productName,
      category,
      quantity,
      unit,
      lowStockThreshold: lowStockThreshold || 5,
      purchasePrice,
      supplier: supplier || "",
      status: quantity === 0 ? "out_of_stock" : quantity <= (lowStockThreshold || 5) ? "low_stock" : "in_stock"
    });

    return sendSuccess(res, { item }, "Inventory item created.", 201);
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/inventory/:inventoryId/stock */
const updateStock = async (req, res, next) => {
  try {
    const { delta } = req.body; // positive = add, negative = reduce
    if (delta == null) throw new ApiError("delta (number) is required.", 400);

    const item = await Inventory.findOne({
      inventoryId: req.params.inventoryId,
      salonId: req.manager.salonId
    });
    if (!item) throw new ApiError("Inventory item not found.", 404);

    item.quantity = Math.max(0, item.quantity + delta);

    // Auto update status
    if (item.quantity === 0) item.status = "out_of_stock";
    else if (item.quantity <= item.lowStockThreshold) item.status = "low_stock";
    else item.status = "in_stock";

    await item.save();
    return sendSuccess(res, { item }, "Stock updated.");
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/inventory/:inventoryId */
const updateItem = async (req, res, next) => {
  try {
    const allowed = ["productName", "category", "quantity", "unit", "lowStockThreshold", "purchasePrice", "supplier", "status"];
    const updates = {};
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });

    const item = await Inventory.findOneAndUpdate(
      { inventoryId: req.params.inventoryId, salonId: req.manager.salonId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!item) throw new ApiError("Inventory item not found.", 404);
    return sendSuccess(res, { item }, "Item updated.");
  } catch (err) {
    next(err);
  }
};

/** DELETE /api/inventory/:inventoryId */
const deleteItem = async (req, res, next) => {
  try {
    const item = await Inventory.findOneAndDelete({
      inventoryId: req.params.inventoryId,
      salonId: req.manager.salonId
    });
    if (!item) throw new ApiError("Inventory item not found.", 404);
    return sendSuccess(res, null, "Item deleted.");
  } catch (err) {
    next(err);
  }
};

module.exports = { getInventory, createItem, updateStock, updateItem, deleteItem };
