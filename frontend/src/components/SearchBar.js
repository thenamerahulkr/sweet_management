import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const categories = ['', 'Chocolate', 'Candy', 'Gummy', 'Hard Candy', 'Lollipop', 'Marshmallow', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Filter out empty values
    const filteredParams = Object.entries(searchParams).reduce((acc, [key, value]) => {
      if (value.trim() !== '') {
        acc[key] = value.trim();
      }
      return acc;
    }, {});
    
    onSearch(filteredParams);
  };

  const handleClear = () => {
    setSearchParams({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    });
    onSearch({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name Search */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Sweet Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={searchParams.name}
              onChange={handleChange}
              placeholder="Search by name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={searchParams.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price ($)
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              min="0"
              step="0.01"
              value={searchParams.minPrice}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Max Price */}
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price ($)
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              min="0"
              step="0.01"
              value={searchParams.maxPrice}
              onChange={handleChange}
              placeholder="100.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;