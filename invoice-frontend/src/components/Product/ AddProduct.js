import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [products, setProducts] = useState([{ name: '', qty: '', rate: '' }]);

  const handleProductChange = (index, e) => {
    const values = [...products];
    values[index][e.target.name] = e.target.value;
    setProducts(values);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', qty: '', rate: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const values = [...products];
    values.splice(index, 1);
    setProducts(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://invoicegenerator-ud0x.onrender.com/api/products', { products }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.href = '/quotations';
    } catch (err) {
      console.error('Error adding products:', err);
    }
  };

  return (
    <div>
      <h2>Add Products</h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index}>
            <input type="text" name="name" value={product.name} onChange={(e) => handleProductChange(index, e)} placeholder="Product Name" required />
            <input type="number" name="qty" value={product.qty} onChange={(e) => handleProductChange(index, e)} placeholder="Quantity" required />
            <input type="number" name="rate" value={product.rate} onChange={(e) => handleProductChange(index, e)} placeholder="Rate" required />
            <button type="button" onClick={() => handleRemoveProduct(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddProduct}>Add Another Product</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
