const axios = require('axios');
const Order = require('../models/Order');
const { sendPaymentSuccess } = require('../services/emailService');

const initiatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    const payload = {
      item_name: `Commande Rahima Store #${order._id}`,
      item_price: order.totalAmount,
      currency: 'XOF',
      ref_command: order._id.toString(),
      command_name: `Paiement pour la commande #${order._id}`,
      env: 'test', // Passer à 'prod' en production
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order-success?id=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cart`,
      ipn_url: `${process.env.BACKEND_URL || 'http://localhost:5001'}/api/payment/ipn`,
    };

    const config = {
      headers: {
        'API_KEY': process.env.PAYTECH_API_KEY,
        'API_SECRET': process.env.PAYTECH_API_SECRET,
      }
    };

    const response = await axios.post('https://paytech.sn/api/payment/request-payment', payload, config);

    if (response.data.success === 1) {
      // Mettre à jour la commande avec le token de transaction si nécessaire
      order.paymentToken = response.data.token;
      await order.save();

      res.json({
        success: true,
        redirect_url: response.data.redirect_url,
        token: response.data.token
      });
    } else {
      res.status(400).json({
        success: false,
        message: response.data.errors?.[0] || 'Erreur lors de l\'initialisation du paiement'
      });
    }
  } catch (error) {
    console.error('PayTech Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Erreur interne lors du paiement' });
  }
};

/**
 * IPN (Instant Payment Notification) handler
 * PayTech will call this endpoint when payment status changes
 */
const handleIPN = async (req, res) => {
  try {
    const { type_event, ref_command, item_price, api_key_sha256, api_secret_sha256 } = req.body;

    // TODO: Verify hashes for security (see PayTech docs)
    // For now, we process if the order exists

    if (type_event === 'sale_complete') {
      const order = await Order.findById(ref_command);
      if (order) {
        order.paymentStatus = 'Paid';
        order.status = 'Processing'; 
        await order.save();
        
        // Send Payment Success Email
        sendPaymentSuccess(order);
        
        console.log(`Payment confirmed for order ${ref_command}`);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('IPN Error:', error);
    res.sendStatus(500);
  }
};

module.exports = { initiatePayment, handleIPN };
