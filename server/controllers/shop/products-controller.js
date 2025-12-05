// const Product = require("../../models/Product");

// const getFilteredProducts = async (req, res) => {
//   try {
//     const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

//     let filters = {};

//     if (category.length) {
//       filters.category = { $in: category.split(",") };
//     }

//     if (brand.length) {
//       filters.brand = { $in: brand.split(",") };
//     }

//     let sort = {};

//     switch (sortBy) {
//       case "price-lowtohigh":
//         sort.price = 1;

//         break;
//       case "price-hightolow":
//         sort.price = -1;

//         break;
//       case "title-atoz":
//         sort.title = 1;

//         break;

//       case "title-ztoa":
//         sort.title = -1;

//         break;

//       default:
//         sort.price = 1;
//         break;
//     }

//     const products = await Product.find(filters).sort(sort);

//     res.status(200).json({
//       success: true,
//       data: products,
//     });
//   } catch (e) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured",
//     });
//   }
// };

// const getProductDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);

//     if (!product)
//       return res.status(404).json({
//         success: false,
//         message: "Product not found!",
//       });

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (e) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured",
//     });
//   }
// };

// module.exports = { getFilteredProducts, getProductDetails };


// const Product = require("../../models/Product");

// // ====================
// // 🛍️ Get Filtered Products
// // ====================
// const getFilteredProducts = async (req, res) => {
//   try {
//     const { Festival = "", Idols = "", sortBy = "price-lowtohigh" } = req.query;

//     let filters = {};
//     if (Festival) filters.category = { $in: category.split(",") };
//     if (Idols) filters.brand = { $in: brand.split(",") };

//     let sort = {};
//     switch (sortBy) {
//       case "price-lowtohigh":
//         sort.price = 1;
//         break;
//       case "price-hightolow":
//         sort.price = -1;
//         break;
//       case "title-atoz":
//         sort.title = 1;
//         break;
//       case "title-ztoa":
//         sort.title = -1;
//         break;
//       default:
//         sort.price = 1;
//         break;
//     }

//     const products = await Product.find(filters).sort(sort);

//     res.status(200).json({
//       success: true,
//       data: products,
//     });
//   } catch (e) {
//     console.log("❌ Error fetching filtered products:", e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred while fetching products",
//     });
//   }
// };

// // ====================
// // 🔍 Get Product Details
// // ====================
// const getProductDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);

//     if (!product)
//       return res.status(404).json({
//         success: false,
//         message: "Product not found!",
//       });

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (e) {
//     console.log("❌ Error fetching product details:", e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred while fetching product details",
//     });
//   }
// };

// module.exports = { getFilteredProducts, getProductDetails };



const Product = require("../../models/Product");

// ====================
// 🛍️ Get Filtered Products
// ====================
const getFilteredProducts = async (req, res) => {
  try {
    const { Festival = "", Idols = "", sortBy = "price-lowtohigh" } = req.query;

    // 🧩 Build filters dynamically
    let filters = {};
    if (Festival && Festival !== "All") filters.Festival = Festival;
    if (Idols && Idols !== "All") filters.Idols = Idols;

    // ⚙️ Sorting logic
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    // 📥 Log incoming filters
    console.log("📥 Filters:", filters);

    // 🧠 Query products
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log("❌ Error fetching filtered products:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching products",
    });
  }
};

// ====================
// 🔍 Get Product Details
// ====================
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log("❌ Error fetching product details:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching product details",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
