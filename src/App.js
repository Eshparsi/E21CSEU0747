import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AllProductsPage from './AllProductsPage';
import ProductDetailPage from './ProductDetailPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<AllProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
