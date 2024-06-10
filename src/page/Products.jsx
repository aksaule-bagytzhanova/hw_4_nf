import React from 'react';
import { useQuery } from 'react-query';
import axiosInstance from './axiosInstance';

export const createProduct = async (product) => {
    const response = await axiosInstance.post('/products', product);
    return response.data;
};

export const fetchProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  };

const Products = () => {
  const { data, error, isLoading } = useQuery('products', fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.map(i => (
          <li key={i.id}>
            <h2>{i.title}</h2>
            <p>{i.description}</p>
            <p>${i.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
