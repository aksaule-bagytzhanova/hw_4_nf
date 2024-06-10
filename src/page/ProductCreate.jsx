import React, { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';
import { createProduct } from './Products';

const ProductCreate = () => {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
  
    const mutation = useMutation(createProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
      },
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      mutation.mutate({ title, description, price });
    };
  
    return (
      <div>
        <h1>Create Product</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button type="submit">Create Product</button>
        </form>
        {mutation.isLoading && <div>Creating product...</div>}
        {mutation.isError && <div>Error: {mutation.error.message}</div>}
      </div>
    );
  };
  
  export default ProductCreate;