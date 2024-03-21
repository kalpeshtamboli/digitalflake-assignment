const express = require("express");
const {
  registerUser,
  loginUser,
  postCategory,
  getAllCategoryData,
  deleteCategoryById,
  forgetPassword,
  resetPassword,
  postProductDetail,
  getAllproductDetail,
  deleteProductById
} = require("../Controller/controller");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/category").post(postCategory);
router.route("/getAllCategoryData").get(getAllCategoryData);
router.route("/deleteCategory/:_id").delete(deleteCategoryById);
router.route("/forgetPassword").post(forgetPassword);
router.route("/reset-password").post(resetPassword);
router.route("/productDetails").post(postProductDetail);
router.route("/getAllproductDetail").get(getAllproductDetail);
router.route("/deleteProductById/:_id").delete(deleteProductById);



module.exports = router;
