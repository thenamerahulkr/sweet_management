const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sweet name is required'],
    trim: true,
    minlength: [2, 'Sweet name must be at least 2 characters long']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: ['Chocolate', 'Candy', 'Gummy', 'Hard Candy', 'Lollipop', 'Marshmallow', 'Other']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for search functionality
sweetSchema.index({ name: 'text', category: 'text', description: 'text' });

module.exports = mongoose.model('Sweet', sweetSchema);