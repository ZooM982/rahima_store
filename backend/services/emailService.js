const nodemailer = require('nodemailer');
const { 
  orderConfirmationTemplate, 
  paymentSuccessTemplate, 
  orderStatusUpdateTemplate,
  newAccountTemplate,
  welcomeEmailTemplate
} = require('../utils/emailTemplates');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: parseInt(process.env.EMAIL_PORT) === 465, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Necessary for some hosting providers like LWS
  }
});

const sendOrderConfirmation = async (order, toEmail) => {
  try {
    const html = orderConfirmationTemplate(order);
    await transporter.sendMail({
      from: `"Rahima Store" <${process.env.EMAIL_USER}>`,
      to: toEmail || order.customer.email,
      subject: `Confirmation de votre commande #${order._id.toString().slice(-6).toUpperCase()}`,
      html,
      text: `Bonjour ${order.customer.name}, nous avons bien reçu votre commande #${order._id.toString().slice(-6).toUpperCase()}. Merci de votre confiance !`
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
      text: `Bonjour ${order.customer.name}, votre paiement pour la commande #${order._id.toString().slice(-6).toUpperCase()} a été validé. Merci !`
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
      text: `Bonjour, le statut de votre commande #${order._id.toString().slice(-6).toUpperCase()} est désormais : ${status}. ${message}`
    });
    console.log('Status update email sent');
  } catch (error) {
    console.error('Error sending status update email:', error);
  }
};

const sendNewAccountEmail = async (user, tempPassword) => {
  try {
    const html = newAccountTemplate(user, tempPassword);
    await transporter.sendMail({
      from: `"Rahima Store" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Bienvenue chez Rahima Store - Vos identifiants',
      html,
      text: `Bienvenue ${user.name} ! Votre compte a été créé. Vos identifiants : Email ${user.email} | Mot de passe temporaire : ${tempPassword}`
    });
    console.log('Credentials email sent');
  } catch (error) {
    console.error('Error sending credentials email:', error);
  }
};

const sendWelcomeEmail = async (user) => {
  try {
    const html = welcomeEmailTemplate(user);
    await transporter.sendMail({
      from: `"Rahima Store" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Bienvenue chez Rahima Store !',
      html,
      text: `Bienvenue chez Rahima Store, ${user.name} ! Nous sommes ravis de vous compter parmi nos clients.`
    });
    console.log('Welcome email sent');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

const sendForgotPasswordEmail = async (user, resetUrl) => {
  try {
    const html = forgotPasswordTemplate(user, resetUrl);
    await transporter.sendMail({
      from: `"Rahima Store" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe - Rahima Store',
      html,
      text: `Bonjour ${user.name}, vous avez demandé la réinitialisation de votre mot de passe. Utilisez ce lien pour procéder : ${resetUrl}`
    });
    console.log('Forgot password email sent to:', user.email);
  } catch (error) {
    console.error('Error sending forgot password email:', error);
  }
};

module.exports = {
  sendOrderConfirmation,
  sendPaymentSuccess,
  sendStatusUpdate,
  sendNewAccountEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail
};
