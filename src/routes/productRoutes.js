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

// Download individual PDF
router.get('/download-pdf/:filename', authenticateToken, async (req, res) => {
    console.log("Download PDF endpoint hit");
    const userId = req.user.id;
    const { filename } = req.params;
  
    try {
      const quotation = await Quotation.findOne({ userId, 'filePath': { $regex: filename } });
  
      if (!quotation) {
        return res.status(404).json({ message: 'Quotation not found' });
      }
  
      const filepath = quotation.filePath;
      const absoluteFilePath = path.resolve(filepath); // Get the absolute path
      if (fs.existsSync(absoluteFilePath)) {
        res.sendFile(absoluteFilePath, (err) => {
          if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error generating PDF');
          } else {
            console.log('PDF sent successfully');
          }
        });
      } else {
        res.status(404).send('File not found');
      }
    } catch (err) {
      console.error('Error downloading PDF:', err);
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;
