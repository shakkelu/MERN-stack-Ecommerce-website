const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "completed", "shipped", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
