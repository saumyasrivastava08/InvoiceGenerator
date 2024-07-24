import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register";
import AddProduct from "./components/Product/ AddProduct.js";
import QuotationList from "./components/Quotations/QuotationList";
import QuotationDetail from "./components/Quotations/ QuotationDetail.js";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/quotations" element={<QuotationList />} />
          <Route path="/quotation/:id" element={<QuotationDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
