import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css"; // Import the CSS file

const AddProduct = () => {

  const [products, setProducts] = useState([{ name: "", qty: "", rate: "" }]);

  const handleProductChange = (index, e) => {
    const values = [...products];
    values[index][e.target.name] = e.target.value;
    setProducts(values);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: "", qty: "", rate: "" }]);
  };

  const handleRemoveProduct = (index) => {
    const values = [...products];
    values.splice(index, 1);
    setProducts(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://invoicegenerator-ud0x.onrender.com/api/products",
        { products },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      window.location.href = "/quotations";
    } catch (err) {
      console.error("Error adding products:", err);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Products</h2>
      <form onSubmit={handleSubmit} className="product-form">
        {products.map((product, index) => (
          <div key={index} className="product-inputs">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Product Name"
              required
              className="input-field"
            />
            <input
              type="number"
              name="qty"
              value={product.qty}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Quantity"
              required
              className="input-field"
            />
            <input
              type="number"
              name="rate"
              value={product.rate}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Rate"
              required
              className="input-field"
            />
            <button
              type="button"
              onClick={() => handleRemoveProduct(index)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddProduct} className="add-button">
          Add Another Product
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
