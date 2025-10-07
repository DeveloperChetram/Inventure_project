import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/actions/productActions';
import './Products.css'; // Add some basic styling

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, totalPages, currentPage } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // State for the form and editing logic
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateProduct({ id: currentProduct._id, productData: formData }));
    } else {
      dispatch(addProduct(formData));
    }
    resetForm();
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({ name: product.name, description: product.description, price: product.price });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setFormData({ name: '', description: '', price: '' });
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchProducts({ page: newPage, search }));
  };

  return (
    <div className="products-container">
      {isAuthenticated && (
        <div className="product-form-container">
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
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
            {items.map((product) => (
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
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>Previous</button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Products;