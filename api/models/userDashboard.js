import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    numberOfOrders: { type: Number, default: 0 },
    numberOfPurchases: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;
