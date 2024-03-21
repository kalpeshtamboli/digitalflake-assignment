const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const categorySchema = require("../models/CategoryModel");
const productSchema = require("../models/ProductSchema");
const category = require("../models/CategoryModel");
const nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "kalpeshtamboli2000@gmail.com", // Your email address
    pass: "tourcrbnhihjmlrm", // Your password
  },
});

function sendPasswordResetEmail(recipientEmail, resetToken) {
  // Email content
  let mailOptions = {
    from: "your_email@gmail.com", // Sender email address
    to: recipientEmail, // Recipient email address
    subject: "Password Reset Request",
    html: `<p>Dear user,</p>
             <p>We've received a request to reset the password associated with your account. Please click on the following link to reset your password:</p>
             <a href="http://localhost:3000/reset/${resetToken}">Reset Password</a>
             <p>If you did not initiate this request, please disregard this email.</p>
             <p>Thank you.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Password reset email sent: " + info.response);
  });
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExist = await User.findOne({ email, name });

  if (userExist) {
    res.status(400).json({ message: "User Already Exist" });
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).json({ message: "error occured" });
  }
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("rq.body", req.body);
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({ message: "Invalid email or password" });
  }
};

const postCategory = async (req, res) => {
  const { category, description, status } = req.body;
  try {
    const newCategory = new categorySchema({ category, description, status });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const postProductDetail = async (req, res) => {
  const {
    categoryStatus,
    productName,
    MRP,
    productStatus,
    productImage,
    packSize,
  } = req.body;
  console.log("req.body----->", req.body);
  try {
    const newProduct = new productSchema({
      categoryStatus,
      productName,
      packSize,
      MRP,
      productStatus,
      productImage,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllproductDetail = async (req, res) => {
  try {
    const productschema = await productSchema.find();
    res.status(200).json(productschema);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllCategoryData = async (req, res) => {
  try {
    const category = await categorySchema.find();
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const deletedCategory = await productSchema.findByIdAndDelete(_id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const deletedCategory = await category.findByIdAndDelete(_id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email", email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expiration time: 1 hour
    await user.save();
    sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Update user's password
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  postCategory,
  getAllCategoryData,
  deleteCategoryById,
  forgetPassword,
  resetPassword,
  postProductDetail,
  getAllproductDetail,
  deleteProductById,
};
