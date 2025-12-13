import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sweetsAPI } from '../services/api';

const SweetCard = ({ sweet, onUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [restockQuantity, setRestockQuantity] = useState(1);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showRestockForm, setShowRestockForm] = useState(false);
  const [error, setError] = useState('');
  
  const { isAdmin } = useAuth();

  const handlePurchase = async () => {
    try {
      setLoading(true);
      setError('');
      
      await sweetsAPI.purchase(sweet._id, purchaseQuantity);
      setShowPurchaseForm(false);
      setPurchaseQuantity(1);
      onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async () => {
    try {
      setLoading(true);
      setError('');
      
      await sweetsAPI.restock(sweet._id, restockQuantity);
      setShowRestockForm(false);
      setRestockQuantity(1);
      onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Restock failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        setLoading(true);
        await sweetsAPI.delete(sweet._id);
        onDelete();
      } catch (err) {
        setError(err.response?.data?.message || 'Delete failed');
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Sweet Image */}
      <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
        {sweet.imageUrl ? (
          <img
            src={sweet.imageUrl}
            alt={sweet.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-6xl">🍬</div>
        )}
      </div>

      {/* Sweet Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {sweet.name}
          </h3>
          <span className="text-lg font-bold text-green-600">
            ${sweet.price.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {sweet.category}
          </span>
          <span className={`text-sm font-medium ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
          </span>
        </div>

        {sweet.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {sweet.description}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-3 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Purchase Form */}
        {showPurchaseForm && (
          <div className="mb-3 p-3 bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max={sweet.quantity}
                value={purchaseQuantity}
                onChange={(e) => setPurchaseQuantity(parseInt(e.target.value))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <button
                onClick={handlePurchase}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
              >
                Buy
              </button>
              <button
                onClick={() => setShowPurchaseForm(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Restock Form */}
        {showRestockForm && (
          <div className="mb-3 p-3 bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(parseInt(e.target.value))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <button
                onClick={handleRestock}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
              >
                Restock
              </button>
              <button
                onClick={() => setShowRestockForm(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {!showPurchaseForm && !showRestockForm && (
            <>
              <button
                onClick={() => setShowPurchaseForm(true)}
                disabled={sweet.quantity === 0 || loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded text-sm font-medium disabled:cursor-not-allowed"
              >
                Purchase
              </button>
              
              {isAdmin() && (
                <>
                  <button
                    onClick={() => setShowRestockForm(true)}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium"
                  >
                    Restock
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium"
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;