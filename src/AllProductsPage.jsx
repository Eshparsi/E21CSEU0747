import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: '',
    company: '',
    rating: '',
    priceRange: '',
    availability: ''
  });
  const [authData, setAuthData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  useEffect(() => {
    registerCompany();
  }, []);

  const registerCompany = async () => {
    try {
      const response = await fetch('http://20.244.56.144/test/register', {
        method: 'POST',
        body: JSON.stringify({
          "companyName": "Bennett University",
          "ownerName": "Eshparsi",
          "rollNo": "E21CSEU0747",
          "ownerEmail": "e21cseu0747@bennett.edu.in",
          "accessCode": "XImuYx",
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      setAuthData(data);
    } catch (error) {
      console.error('Error registering company:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://20.244.56.144/test/companies/AMZ/categories/Phone/products?top=100&minPrice=0&maxPrice=1000&clientID=${authData.clientID}&clientSecret=${authData.clientSecret}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (authData) {
      fetchProducts();
    }
  }, [authData, fetchProducts]);

  const handleFilterChange = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  useEffect(() => {
    let filtered = [...products];
    if (filter.category) {
      filtered = filtered.filter(product => product.category === filter.category);
    }
    if (filter.company) {
      filtered = filtered.filter(product => product.company === filter.company);
    }
    if (filter.rating) {
      filtered = filtered.filter(product => product.rating >= parseInt(filter.rating));
    }
    if (filter.priceRange) {
      const [minPrice, maxPrice] = filter.priceRange.split('-');
      filtered = filtered.filter(product => product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice));
    }
    if (filter.availability) {
      filtered = filtered.filter(product => product.availability === filter.availability);
    }
    setFilteredProducts(filtered);
  }, [filter, products]);

  const sortProducts = (key) => {
    const sorted = [...filteredProducts];
    sorted.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setFilteredProducts(sorted);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5" style={{ backgroundColor: '#f8f9fa', padding: '50px', borderRadius: '10px' }}>
      <h1 className="mb-4">All Products</h1>
      <div className="mb-4 d-flex flex-wrap">
        <DropdownButton id="dropdown-basic-button" title="Filter by Category" className="me-2 mb-2" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }} >
          <Dropdown.Item onClick={() => handleFilterChange('category', 'Phone')}>Phone</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterChange('category', 'Computer')}>Computer</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Filter by Company" className="me-2 mb-2"style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
          <Dropdown.Item onClick={() => handleFilterChange('company', 'AMZ')}>AMZ</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterChange('company', 'FLP')}>FLP</Dropdown.Item>
          
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Filter by Rating" className="me-2 mb-2" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }} >
          <Dropdown.Item onClick={() => handleFilterChange('rating', '4')}>4 Stars & Up</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterChange('rating', '3')}>3 Stars & Up</Dropdown.Item>
          
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Filter by Price Range" className="me-2 mb-2" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }} >
          <Dropdown.Item onClick={() => handleFilterChange('priceRange', '0-100')}>$0 - $100</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterChange('priceRange', '101-200')}>$101 - $200</Dropdown.Item>
          
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Filter by Availability" className="me-2 mb-2" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }} >
          <Dropdown.Item onClick={() => handleFilterChange('availability', 'In Stock')}>In Stock</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterChange('availability', 'Out of Stock')}>Out of Stock</Dropdown.Item>
        
        </DropdownButton>
      </div>
      <div className="mb-4">
        <Button variant="primary" onClick={() => sortProducts('price')} className="me-2" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>Sort by Price</Button>
        <Button variant="primary" onClick={() => sortProducts('rating')} className="me-2" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}> Sort by Rating</Button>
    
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {currentProducts.map((product) => (
          <Col key={product.productId}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  Company: {product.company}
                  <br />
                  Category: {product.category}
                  <br />
                  Price: ${product.price}
                  <br />
                  Rating: {product.rating}
                  <br />
                  Discount: {product.discount}
                  <br />
                  Availability: {product.availability}
                </Card.Text>
                <Link to={`/product/${product.productId}`} className="btn btn-primary mt-3">View Details</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <nav className="mt-5">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AllProductsPage;
