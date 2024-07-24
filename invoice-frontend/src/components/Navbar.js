import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
        <li><Link to="/quotations">View Quotations</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
