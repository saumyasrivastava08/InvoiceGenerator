const Product = require('../models/Product');;
const fs = require('fs');
const path = require('path');
const Quotation = require('../models/Quotation');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

// Function to add products
exports.addProducts = async (req, res) => {
    console.log("addProducts endpoint hit");
    const { products } = req.body;
    const userId = req.user.user.id;
  
    console.log("Products:", products);
    console.log("User ID:", userId);
  
    if (!Array.isArray(products) || products.length === 0) {
      console.log("Invalid products array");
      return res.status(400).json({ message: 'Products should be an array and cannot be empty' });
    }
  
    try {
      // Compute GST and create Product instances
      const productInstances = products.map(product => ({
        ...product,
        gst: product.rate * product.qty * 0.18, // GST at 18%
      }));
  
      console.log("Product instances with GST:", productInstances);
  
      // Read the HTML template
      const templatePath = path.join(__dirname, '../invoiceTemplate.html');
      const templateHtml = fs.readFileSync(templatePath, 'utf8');
      const template = handlebars.compile(templateHtml);
      const html = template({
        date: new Date().toLocaleDateString(),
        userId,
        products: productInstances
      });
  
      // Generate PDF
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      const filename = `Invoice_${Date.now()}.pdf`;
      const filepath = path.join(__dirname, '../invoices', filename);
      await page.pdf({ path: filepath, format: 'A4' });
      await browser.close();
      
      console.log("PDF generated:", filepath);
  
      // Create a new quotation entry with file path
      const quotation = new Quotation({
        date: new Date(),
        userId,
        products: productInstances,
        filePath: filepath
      });
      
      await quotation.save();
      console.log("Quotation saved to DB");
  
      // Respond with the PDF file
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
      console.error('Error processing request:', err);
      res.status(500).send('Server error');
    }
};

// Function to list quotations
exports.listQuotations = async (req, res) => {
  console.log("listQuotations endpoint hit");
  const userId = req.user.id;

  console.log("User ID:", userId);

  try {
    const quotations = await Quotation.find({ userId });

    if (!quotations || quotations.length === 0) {
      console.log("No quotations found");
      return res.status(404).json({ message: 'No quotations found' });
    }

    console.log("Quotations found:", quotations);

    res.json({ quotations });
  } catch (err) {
    console.error('Error fetching quotations:', err);
    res.status(500).send('Server error');
  }
};

// Function to download individual PDF
exports.downloadPDF = async (req, res) => {
  console.log("downloadPDF endpoint hit");
  const userId = req.user.id;
  const { filename } = req.params;

  console.log("User ID:", userId);
  console.log("Filename:", filename);

  try {
    const quotation = await Quotation.findOne({ userId, 'filePath': { $regex: filename } });

    if (!quotation) {
      console.log("Quotation not found");
      return res.status(404).json({ message: 'Quotation not found' });
    }

    const filePath = quotation.filePath;
    console.log("File path:", filePath);
    res.sendFile(filePath, { root: path.resolve(__dirname, '..') }, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error downloading PDF');
      } else {
        console.log('PDF sent successfully');
      }
    });
  } catch (err) {
    console.error('Error downloading PDF:', err);
    res.status(500).send('Server error');
  }
};
