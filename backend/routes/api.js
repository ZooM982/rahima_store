const express = require('express');
const { login, register, getMe, updateProfile } = require('../controllers/authController');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { getUsers, deleteUser, getCustomerDetails } = require('../controllers/userController');
const { generateSitemap, generateRobots } = require('../controllers/seoController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré de l'utilisateur
 *         name:
 *           type: string
 *           description: Nom de l'utilisateur
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Le rôle de l'utilisateur
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         mainImage:
 *           type: string
 */

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', authMiddleware, getMe);
router.put('/auth/profile', authMiddleware, updateProfile);

// Products
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', authMiddleware, adminMiddleware, createProduct);
router.put('/products/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, deleteProduct);

// Orders
router.post('/orders', createOrder);
router.get('/orders/my', authMiddleware, getMyOrders);
router.get('/orders', authMiddleware, adminMiddleware, getOrders);
router.get('/orders/:id', authMiddleware, adminMiddleware, getOrderById);
router.put('/orders/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

// Payment (PayTech)
const paymentRoutes = require('./paymentRoutes');
router.use('/payment', paymentRoutes);

// Users
router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.get('/users/customer/:email', authMiddleware, adminMiddleware, getCustomerDetails);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// Notifications
const { getNotifications, markAsRead, markAllAsRead, subscribe } = require('../controllers/notificationController');
router.get('/notifications', authMiddleware, adminMiddleware, getNotifications);
router.put('/notifications/read-all', authMiddleware, adminMiddleware, markAllAsRead);
router.put('/notifications/:id/read', authMiddleware, adminMiddleware, markAsRead);
router.post('/notifications/subscribe', authMiddleware, subscribe);

// SEO — public
router.get('/sitemap.xml', generateSitemap);
router.get('/robots.txt', generateRobots);

module.exports = router;
