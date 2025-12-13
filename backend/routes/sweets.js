const express = require('express');
const Sweet = require('../models/Sweet');
const { auth, adminAuth } = require('../middleware/auth');
const {
  createSweetSchema,
  updateSweetSchema,
  purchaseSchema,
  restockSchema
} = require('../validation/sweetValidation');

const router = express.Router();


router.post('/', adminAuth, async (req, res) => {
  try {
    // Validate request body
    const { error, value } = createSweetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const sweet = await Sweet.create(value);

    res.status(201).json({
      success: true,
      data: sweet
    });
  } catch (error) {
    console.error('Create sweet error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating sweet'
    });
  }
});

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: sweets
    });
  } catch (error) {
    console.error('Get sweets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sweets'
    });
  }
});

// @desc    Search sweets
// @route   GET /api/sweets/search
// @access  Private
router.get('/search', auth, async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    let query = {};

    // Build search query
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Sweet.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: sweets
    });
  } catch (error) {
    console.error('Search sweets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching sweets'
    });
  }
});

// @desc    Update sweet
// @route   PUT /api/sweets/:id
// @access  Private/Admin
router.put('/:id', adminAuth, async (req, res) => {
  try {
    // Validate request body
    const { error, value } = updateSweetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    res.json({
      success: true,
      data: sweet
    });
  } catch (error) {
    console.error('Update sweet error:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating sweet'
    });
  }
});

// @desc    Delete sweet (Admin only)
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    res.json({
      success: true,
      message: 'Sweet deleted successfully'
    });
  } catch (error) {
    console.error('Delete sweet error:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting sweet'
    });
  }
});

// @desc    Purchase sweet
// @route   POST /api/sweets/:id/purchase
// @access  Private
router.post('/:id/purchase', auth, async (req, res) => {
  try {
    // Validate request body
    const { error, value } = purchaseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { quantity } = value;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available'
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({
      success: true,
      data: sweet,
      message: `Successfully purchased ${quantity} ${sweet.name}(s)`
    });
  } catch (error) {
    console.error('Purchase sweet error:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while purchasing sweet'
    });
  }
});

// @desc    Restock sweet (Admin only)
// @route   POST /api/sweets/:id/restock
// @access  Private/Admin
router.post('/:id/restock', adminAuth, async (req, res) => {
  try {
    // Validate request body
    const { error, value } = restockSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { quantity } = value;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.json({
      success: true,
      data: sweet,
      message: `Successfully restocked ${quantity} ${sweet.name}(s)`
    });
  } catch (error) {
    console.error('Restock sweet error:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while restocking sweet'
    });
  }
});

module.exports = router;