import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/actions/productActions';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, totalPages, currentPage, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts({ page, search }, dispatch);
  }, [dispatch, page, search]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(currentProduct._id, formData, dispatch);
    } else {
      addProduct(formData, dispatch);
    }
    resetForm();
  };
  
  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteProduct(id, dispatch);
    }
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({ name: product.name, description: product.description, price: product.price });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setFormData({ name: '', description: '', price: '' });
  };

  return (
    <div className="products-container">
      {isAuthenticated && (
        <div className="product-form-container">
          <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleFormSubmit}>
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
            <input name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
            <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price" required />
            <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
          </form>
        </div>
      )}

      <div className="product-list-container">
        <h2>Product List</h2>
        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        {loading ? <p>Loading...</p> : (
          <ul className="product-list">
            {products.map((product) => (
              <li key={product._id} className="product-item">
                <span>{product.name} - ${product.price}</span>
                {isAuthenticated && (
                  <div className="product-actions">
                    <button onClick={() => handleEditClick(product)}>Edit</button>
                    <button onClick={() => handleDeleteClick(product._id)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</button>
          <span> Page {page} of {totalPages} </span>
          <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Products;