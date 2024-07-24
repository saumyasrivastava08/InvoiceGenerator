const express = require('express');
const connectDB = require('./config/db'); // Ensure the path is correct
const authRoutes = require('./routes/auth'); // Ensure the path is correct

const app = express();

app.use(express.json());

connectDB()
  .then(db => {
    console.log("Database connected");
    // Start your server or perform other operations here
    // Define routes here

  
  })
  .catch(err => {
    console.error("Error connecting to database:", err);
  });

  app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
