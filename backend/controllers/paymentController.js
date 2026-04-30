const axios = require('axios');
const Order = require('../models/Order');
const { sendPaymentSuccess } = require('../services/emailService');

const initiatePayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    const payload = {
      item_name: `Commande Rahima Store #${order._id.toString().slice(-6).toUpperCase()}`,
      item_price: order.totalAmount,
      currency: 'XOF',
      ref_command: order._id.toString(),
      command_name: `Paiement pour la commande #${order._id.toString().slice(-6).toUpperCase()}`,
      env: 'test', // Passer à 'prod' en production
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order-success?id=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cart`,
      ipn_url: `${process.env.BACKEND_URL || 'http://localhost:5001'}/api/payment/ipn`,
    };

    // If a specific payment method is selected, target it
    if (paymentMethod) {
      payload.target_payment = paymentMethod;
    }

    const config = {
      headers: {
        'API_KEY': process.env.PAYTECH_API_KEY,
        'API_SECRET': process.env.PAYTECH_API_SECRET,
      }
    };

    const response = await axios.post('https://paytech.sn/api/payment/request-payment', payload, config);

    if (response.data.success === 1) {
      order.paymentToken = response.data.token;
      await order.save();

      let redirect_url = response.data.redirect_url;

      // Add Autofill and Auto-submit parameters if a specific method is used
      if (paymentMethod && !paymentMethod.includes(',')) {
        const phone = order.customer.phone.replace(/\s+/g, '');
        // Clean phone number (remove +221 or 00221 for 'nn' param)
        const cleanPhone = phone.replace(/^(\+221|00221|221)/, '');
        
        const params = new URLSearchParams({
          pn: phone.startsWith('+') ? phone : `+221${phone.replace(/^0/, '')}`, // Ensure +221 format
          nn: cleanPhone,
          fn: order.customer.name,
          tp: paymentMethod,
          nac: paymentMethod === 'Carte Bancaire' ? '0' : '1' // 1 for auto-submit
        });
        
        redirect_url += `?${params.toString()}`;
      }

      res.json({
        success: true,
        redirect_url: redirect_url,
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
