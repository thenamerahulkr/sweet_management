const Joi = require('joi');

const createSweetSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Sweet name must be at least 2 characters long',
    'string.max': 'Sweet name cannot exceed 100 characters',
    'any.required': 'Sweet name is required'
  }),
  category: Joi.string().valid('Chocolate', 'Candy', 'Gummy', 'Hard Candy', 'Lollipop', 'Marshmallow', 'Other').required().messages({
    'any.only': 'Category must be one of: Chocolate, Candy, Gummy, Hard Candy, Lollipop, Marshmallow, Other',
    'any.required': 'Category is required'
  }),
  price: Joi.number().min(0).precision(2).required().messages({
    'number.min': 'Price must be a positive number',
    'any.required': 'Price is required'
  }),
  quantity: Joi.number().integer().min(0).required().messages({
    'number.min': 'Quantity cannot be negative',
    'number.integer': 'Quantity must be a whole number',
    'any.required': 'Quantity is required'
  }),
  description: Joi.string().max(500).allow('').messages({
    'string.max': 'Description cannot exceed 500 characters'
  }),
  imageUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'Image URL must be a valid URL'
  })
});

const updateSweetSchema = Joi.object({
  name: Joi.string().min(2).max(100).messages({
    'string.min': 'Sweet name must be at least 2 characters long',
    'string.max': 'Sweet name cannot exceed 100 characters'
  }),
  category: Joi.string().valid('Chocolate', 'Candy', 'Gummy', 'Hard Candy', 'Lollipop', 'Marshmallow', 'Other').messages({
    'any.only': 'Category must be one of: Chocolate, Candy, Gummy, Hard Candy, Lollipop, Marshmallow, Other'
  }),
  price: Joi.number().min(0).precision(2).messages({
    'number.min': 'Price must be a positive number'
  }),
  quantity: Joi.number().integer().min(0).messages({
    'number.min': 'Quantity cannot be negative',
    'number.integer': 'Quantity must be a whole number'
  }),
  description: Joi.string().max(500).allow('').messages({
    'string.max': 'Description cannot exceed 500 characters'
  }),
  imageUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'Image URL must be a valid URL'
  })
});

const purchaseSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    'number.min': 'Purchase quantity must be at least 1',
    'number.integer': 'Purchase quantity must be a whole number',
    'any.required': 'Purchase quantity is required'
  })
});

const restockSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    'number.min': 'Restock quantity must be at least 1',
    'number.integer': 'Restock quantity must be a whole number',
    'any.required': 'Restock quantity is required'
  })
});

module.exports = {
  createSweetSchema,
  updateSweetSchema,
  purchaseSchema,
  restockSchema
};