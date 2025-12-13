import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sweetsAPI } from '../services/api';
import SweetCard from './SweetCard';
import AddSweetModal from './AddSweetModal';
import SearchBar from './SearchBar';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  
  const { user, logout, isAdmin } = useAuth();

  const fetchSweets = useCallback(async () => {
    try {
      setLoading(true);
      let response;
      
      if (Object.keys(searchParams).length > 0) {
        response = await sweetsAPI.search(searchParams);
      } else {
        response = await sweetsAPI.getAll();
      }
      
      setSweets(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch sweets');
      console.error('Fetch sweets error:', err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleSweetAdded = () => {
    setShowAddModal(false);
    fetchSweets();
  };

  const handleSweetUpdated = () => {
    fetchSweets();
  };

  const handleSweetDeleted = () => {
    fetchSweets();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                🍭 Sweet Shop Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name} ({user?.role})
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Add Section */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <SearchBar onSearch={handleSearch} />
            {isAdmin() && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add New Sweet
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Sweets Grid */}
          {sweets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-xl">No sweets found</div>
              {isAdmin() && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Add the first sweet
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sweets.map((sweet) => (
                <SweetCard
                  key={sweet._id}
                  sweet={sweet}
                  onUpdate={handleSweetUpdated}
                  onDelete={handleSweetDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Sweet Modal */}
      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onSweetAdded={handleSweetAdded}
        />
      )}
    </div>
  );
};

export default Dashboard;