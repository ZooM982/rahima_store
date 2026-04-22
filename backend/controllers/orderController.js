const User = require('../models/User');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const { sendNotificationToAdmins } = require('./notificationController');

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, customer, userId, autoCreateAccount } = req.body;
    
    let finalUserId = userId;

    // If not logged in but email matches an existing user, link it
    if (!finalUserId) {
      const existingUser = await User.findOne({ email: customer.email });
      if (existingUser) {
        finalUserId = existingUser._id;
      } else if (autoCreateAccount) {
        // Auto-create account
        const tempPassword = Math.random().toString(36).slice(-8); // Random password
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        const newUser = await User.create({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          password: hashedPassword
        });
        finalUserId = newUser._id;
        // In a real app, we'd send an email with the tempPassword here
      }
    }

    const order = await Order.create({
      items,
      totalAmount,
      customer,
      userId: finalUserId
    });
    
    // 1. Process Stock and Check for Low Stock
    for (const item of order.items) {
      const product = await require('../models/Product').findById(item.productId);
      if (product) {
        product.stock -= item.quantity;
        await product.save();

        if (product.stock < 5) {
          sendNotificationToAdmins({
            title: '⚠️ Alerte Stock Faible',
            body: `Le produit "${product.name}" n'a plus que ${product.stock} unités en stock !`,
            icon: '/favicon.svg',
            data: { url: '/admin/products' }
          }, 'lowStockAlert');
        }
      }
    }

    // 2. Check if new or habitual customer
    const previousOrders = await Order.find({ 'customer.email': order.customer.email, _id: { $ne: order._id } });
    const isNewCustomer = previousOrders.length === 0;

    // 3. Selection of varied messages
    const newCustomerMessages = [
      `Génial ! Une toute nouvelle cliente, ${order.customer.name}, vient de commander pour ${order.totalAmount} FCFA.`,
      `Bienvenue à ${order.customer.name} ! Première commande de ${order.totalAmount} FCFA reçue.`,
      `Nouvelle tête ! ${order.customer.name} nous fait confiance pour la première fois (${order.totalAmount} FCFA).`
    ];

    const habitualCustomerMessages = [
      `Fidélité au top ! ${order.customer.name} est de retour avec une commande de ${order.totalAmount} FCFA.`,
      `On adore ! Notre cliente habituée ${order.customer.name} vient de passer commande (${order.totalAmount} FCFA).`,
      `Rahima, une fidèle ! ${order.customer.name} vient de craquer à nouveau pour ${order.totalAmount} FCFA.`
    ];

    const selectedMessage = isNewCustomer 
      ? newCustomerMessages[Math.floor(Math.random() * newCustomerMessages.length)]
      : habitualCustomerMessages[Math.floor(Math.random() * habitualCustomerMessages.length)];

    // 4. Notify admin (Sale)
    sendNotificationToAdmins({
      title: isNewCustomer ? '✨ Nouveau Client !' : '🛍️ Nouvelle Commande',
      body: selectedMessage,
      icon: '/favicon.svg',
      data: { url: `/admin/orders/${order._id}` }
    }, 'emailOnSale');

    // 5. Notify specifically for "New Customer" if preferred
    if (isNewCustomer) {
      sendNotificationToAdmins({
        title: '🌟 Nouveau Client Acquis',
        body: `Félicitations Rahima, ${order.customer.name} a rejoint tes clientes !`,
        icon: '/favicon.svg',
        data: { url: `/admin/users` }
      }, 'newCustomerAlert');
    }

    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus };
