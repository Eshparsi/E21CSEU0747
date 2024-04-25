import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://20.244.56.144/test/companies/AMZ/categories/Phone/products?top=1&minPrice=0&maxPrice=1000`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProduct(data.products[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {product && (
        <div>
          <h1>{product.name}</h1>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                Price: ${product.price}
              </Card.Text>
              <Button variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
