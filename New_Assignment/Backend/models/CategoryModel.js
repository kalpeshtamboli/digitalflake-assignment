const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique : true
    },
    description: {
      type: String,
      required: true,
      unique : true
    },
    status: {
      type: String,
      unique : true
    },
    
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
