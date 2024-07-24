# Invoice Generator Application

This is a full-stack web application for generating invoices. The backend is built with MongoDB, Express.js, and Node.js. The application also uses Puppeteer for PDF generation and integrates various other tools and libraries.

## Features

- User registration and login
- Invoice creation and management
- PDF generation of invoices
- CI/CD pipeline for automatic image generation and deployment

## Links

-[Backend Deployment](https://invoicegenerator-ud0x.onrender.com)
-[PostMan Collections](https://github.com/saumyasrivastava08/InvoiceGenerator/blob/master/Invoice Generator API.postman_collection.json)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Additional Libraries and Tools](#additional-libraries-and-tools)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/saumyasrivastava08/InvoiceGenerator.git
   ```

2. **Install Backend Dependencies:**

   - Navigate to the `backend` directory:

   ```bash
   npm install
   ```

   - Dependencies include:
     - `express`: Web framework for Node.js
     - `mongoose`: MongoDB object modeling tool
     - `jsonwebtoken`: JSON Web Token implementation
     - `dotenv`: Loads environment variables from `.env` file
     - `puppeteer`: Headless Chrome Node.js API for PDF generation
     - Other utilities and middleware as required

3.**Install Frontend Dependencies:**

- Navigate to the `frontend` directory:
  ````bash
    cd ./invoice-frontend
    npm install
    ```
  ````
- Dependencies include:
  - `react`: JavaScript library for building user interfaces
  - `react-dom`: React’s package for the DOM
  - `axios`: Promise-based HTTP client for the browser and Node.js
  - `dotenv`: Loads environment variables from `.env` file
  - Other libraries for styling and state management

## Running the Application

1. Start the MongoDB server:

   ```bash
   Add your mongo db atlas details
   ```

2. Start the backend server:

   ```bash
   npm start
   ```

3. Start the frontend server:

   ```bash
   cd ./invoice-frontend
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Additional Libraries and Tools

- **Puppeteer**: Used for generating PDFs of invoices.
  - [Puppeteer](https://github.com/puppeteer/puppeteer)
  - Install Puppeteer: `npm install puppeteer`

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
