const mongoose = require("mongoose");

const QuotationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      name: String,
      qty: Number,
      rate: Number,
      gst: Number,
    },
  ],
  filePath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Quotation", QuotationSchema);
