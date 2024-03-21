const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    productStatus: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      unique : true
    },
    MRP: {
        type: String,
        unique : true
      },
      packSize: {
        type: String,
        unique : true
      },
      categoryStatus: {
        type: String,
        unique : true
      },
  },
  {
    timestamps: true,
  }
);

const ProductModel= mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
