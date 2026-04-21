const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  endpoint: {
    type: String,
    required: true,
    unique: true
  },
  keys: {
    p256dh: String,
    auth: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  preferences: {
    emailOnSale: { type: Boolean, default: true },
    lowStockAlert: { type: Boolean, default: true },
    newCustomerAlert: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
