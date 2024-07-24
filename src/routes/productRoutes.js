const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const {
  addProducts,
  listQuotations,
  downloadPDF,
} = require("../controllers/productController");

// Log route hits
router.post(
  "/products",
  authenticateToken,
  (req, res, next) => {
    console.log("POST /api/products route hit");
    next();
  },
  addProducts,
);

router.get(
  "/quotations",
  authenticateToken,
  (req, res, next) => {
    console.log("GET /api/quotations route hit");
    next();
  },
  listQuotations,
);

// Download individual PDF
router.get("/download-pdf/:filename", authenticateToken, async (req, res) => {
  console.log("Download PDF endpoint hit");

  downloadPDF(req, res);
});

module.exports = router;
