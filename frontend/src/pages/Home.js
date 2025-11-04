import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Log the request attempt
      console.log(`Attempting to fetch products (attempt ${retryCount + 1})`);
      
      const response = await api.get('/products');
      console.log('Products fetched successfully:', response.data);
      
      setProducts(response.data);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <div className="text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
        <button 
          onClick={handleRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
            Clothes Store
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-500">
            Browse our latest collection of trendy clothes
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link 
                to={`/product/${product._id}`} 
                key={product._id}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover object-center group-hover:opacity-90 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="mt-2 text-sm text-gray-500">
                      {product.category}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-900">
                        ${product.price?.toFixed(2)}
                      </p>
                      
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${product.stock > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'}`}
                      >
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default Home;
