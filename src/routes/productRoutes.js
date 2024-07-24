const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const {
  addProducts,
  listQuotations,
  downloadPDF
} = require('../controllers/productController');

// Log route hits
router.post('/products', authenticateToken, (req, res, next) => {
  console.log("POST /api/products route hit");
  next();
}, addProducts);

router.get('/quotations', authenticateToken, (req, res, next) => {
  console.log("GET /api/quotations route hit");
  next();
}, listQuotations);

router.get('/quotations/:filename', authenticateToken, (req, res, next) => {
  console.log("GET /api/quotations/:filename route hit");
  console.log("Filename:", req.params.filename);
  next();
}, downloadPDF);

module.exports = router;
