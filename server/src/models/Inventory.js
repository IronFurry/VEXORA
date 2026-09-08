const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    salonId: {
      type: String,
      required: true,
      trim: true
    },

    productName: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 0
    },

    unit: {
      type: String,
      required: true,
      trim: true
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
      min: 0
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0
    },

    supplier: {
      type: String,
      default: "",
      trim: true
    },

    status: {
      type: String,
      enum: ["in_stock", "low_stock", "out_of_stock", "inactive"],
      default: "in_stock"
    }
  },
  {
    timestamps: true
  }
);

// Find inventory for a salon
inventorySchema.index({
  salonId: 1
});

// Find products quickly
inventorySchema.index({
  salonId: 1,
  productName: 1
});

module.exports = mongoose.model("Inventory", inventorySchema);