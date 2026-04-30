const nodemailer = require('nodemailer');
const { 
  orderConfirmationTemplate, 
  paymentSuccessTemplate, 
  orderStatusUpdateTemplate 
} = require('../utils/emailTemplates');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_PORT == 465, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmation = async (order, toEmail) => {
  try {
    const html = orderConfirmationTemplate(order);
    await transporter.sendMail({
      from: `"Rahima Store" <${process.env.EMAIL_USER}>`,
      to: toEmail || order.customer.email,
      subject: `Confirmation de votre commande #${order._id.toString().slice(-6).toUpperCase()}`,
      html,
    });
    console.log('Order confirmation email sent');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

const sendPaymentSuccess = async (order, toEmail) => {
  try {
    const html = paymentSuccessTemplate(order);
    await transporter.sendMail({
      from: `"Rahima Store" <${process.env.EMAIL_USER}>`,
      to: toEmail || order.customer.email,
      subject: `Paiement reçu - Commande #${order._id.toString().slice(-6).toUpperCase()}`,
      html,
    });
    console.log('Payment success email sent');
  } catch (error) {
    console.error('Error sending payment success email:', error);
  }
};

const sendStatusUpdate = async (order, status, message, toEmail) => {
  try {
    const html = orderStatusUpdateTemplate(order, status, message);
    await transporter.sendMail({
      from: `"Rahima Store" <${process.env.EMAIL_USER}>`,
      to: toEmail || order.customer.email,
      subject: `Mise à jour de votre commande #${order._id.toString().slice(-6).toUpperCase()}`,
      html,
    });
    console.log('Status update email sent');
  } catch (error) {
    console.error('Error sending status update email:', error);
  }
};

module.exports = {
  sendOrderConfirmation,
  sendPaymentSuccess,
  sendStatusUpdate
};
