const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// ✅ Handle Cloudinary Upload
// const handleImageUpload = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file uploaded",
//       });
//     }

//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     const url = "data:" + req.file.mimetype + ";base64," + b64;
//     const result = await imageUploadUtil(url);

//     return res.status(200).json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.error("Image upload error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Image upload failed",
//     });
//   }
// };


const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    console.log("✅ Image uploaded locally:", imageUrl);

    return res.status(200).json({
      success: true,
      url: imageUrl,
    });
  } catch (error) {
    console.error("❌ Local Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: error.message,
    });
  }
};


// ✅ Add Product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      Festival,
      Idols,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Basic Validation
    if (
      !image ||
      !title ||
      !description ||
      !Festival ||
      !Idols ||
      !price ||
      !totalStock
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newProduct = new Product({
      image,
      title,
      description,
      Festival,
      Idols,
      price,
      salePrice: salePrice || 0,
      totalStock,
      averageReview: averageReview || 0,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
};

// ✅ Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Fetch products error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};

// ✅ Edit Product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Edit product error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating product",
    });
  }
};

// ✅ Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
