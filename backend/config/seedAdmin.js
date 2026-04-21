const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const adminEmail = 'rahima@store.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('rahima2026', 10);
      await User.create({
        name: 'Rahima Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Default admin user created successfully.');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
  }
};

module.exports = seedAdmin;
