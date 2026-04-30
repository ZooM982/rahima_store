const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Validated', 'Processing', 'Delivered', 'Cancelled'] },
  paymentStatus: { type: String, default: 'Unpaid', enum: ['Unpaid', 'Paid', 'Failed'] },
  paymentToken: { type: String },
  invoiceUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
