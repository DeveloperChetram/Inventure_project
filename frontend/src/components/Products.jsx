import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error, totalPages, currentPage } = useSelector((state) => state.products);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  const handlePageChange = (newPage) => {
    dispatch(fetchProducts({ page: newPage, search }));
  };

  return (
    <div>
      <h2>Product List</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {items.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;