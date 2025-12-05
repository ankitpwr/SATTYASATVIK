// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Multer setup (stores file in memory)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ✅ Utility to upload a file buffer to Cloudinary
// const imageUploadUtil = async (fileBuffer) => {
//   try {
//     // Convert buffer to base64 data URI
//     const base64Image = `data:${fileBuffer.mimetype};base64,${fileBuffer.buffer.toString("base64")}`;

//     const result = await cloudinary.uploader.upload(base64Image, {
//       folder: "ecommerce-products",
//       resource_type: "auto",
//     });

//     return result;
//   } catch (error) {
//     console.error("❌ Cloudinary upload failed:", error);
//     throw error;
//   }
// };


// // module.exports = { cloudinary, upload, imageUploadUtil };

// // helpers/cloudinary.js
// const multer = require("multer");
// const path = require("path");

// // store files locally in /uploads folder
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // make sure this folder exists
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// module.exports = { upload };
















const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads directory if not exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

module.exports = { upload };
