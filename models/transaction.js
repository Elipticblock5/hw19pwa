const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "What is the name of the transaction?"
    },
    value: {
      type: Number,
      required: "What is the amount?"
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

const Transaction = mongoose.model("Transaction", transSchema);

module.exports = Transaction;
