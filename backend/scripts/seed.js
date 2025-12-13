const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Sweet = require('../models/Sweet');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Sweet.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@sweetshop.com',
      password: 'admin123',
      role: 'ADMIN'
    });

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@sweetshop.com',
      password: 'user123',
      role: 'USER'
    });

    console.log('Created users');

    // Create sample sweets
    const sweets = [
      {
        name: 'Milk Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 50,
        description: 'Creamy milk chocolate bar made with premium cocoa beans'
      },
      {
        name: 'Gummy Bears',
        category: 'Gummy',
        price: 1.99,
        quantity: 100,
        description: 'Colorful fruit-flavored gummy bears in assorted flavors'
      },
      {
        name: 'Strawberry Lollipop',
        category: 'Lollipop',
        price: 0.99,
        quantity: 75,
        description: 'Sweet strawberry-flavored lollipop on a stick'
      },
      {
        name: 'Dark Chocolate Truffles',
        category: 'Chocolate',
        price: 8.99,
        quantity: 25,
        description: 'Luxurious dark chocolate truffles with rich cocoa flavor'
      },
      {
        name: 'Sour Patch Kids',
        category: 'Candy',
        price: 3.49,
        quantity: 60,
        description: 'Sour then sweet chewy candy in fun kid shapes'
      },
      {
        name: 'Marshmallow Clouds',
        category: 'Marshmallow',
        price: 2.49,
        quantity: 40,
        description: 'Fluffy vanilla marshmallows that melt in your mouth'
      },
      {
        name: 'Peppermint Hard Candy',
        category: 'Hard Candy',
        price: 1.79,
        quantity: 80,
        description: 'Refreshing peppermint hard candy with cooling sensation'
      },
      {
        name: 'Caramel Chews',
        category: 'Other',
        price: 4.29,
        quantity: 35,
        description: 'Soft and chewy caramel candies with rich buttery flavor'
      }
    ];

    await Sweet.insertMany(sweets);
    console.log('Created sample sweets');

    console.log('\n=== Seed Data Summary ===');
    console.log('Admin User:');
    console.log('  Email: admin@sweetshop.com');
    console.log('  Password: admin123');
    console.log('\nRegular User:');
    console.log('  Email: user@sweetshop.com');
    console.log('  Password: user123');
    console.log(`\nCreated ${sweets.length} sample sweets`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();