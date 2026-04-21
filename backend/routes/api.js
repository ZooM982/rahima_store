const express = require('express');
const { login, register } = require('../controllers/authController');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { getUsers, deleteUser } = require('../controllers/userController');
const { subscribe } = require('../controllers/notificationController');
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
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/auth/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *       401:
 *         description: Identifiants invalides
 */
router.post('/auth/login', login);

// Products
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupérer la liste de tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Liste des produits récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Détails du produit
 *       404:
 *         description: Produit non trouvé
 */
router.get('/products/:id', getProductById);
router.post('/products', authMiddleware, adminMiddleware, createProduct);
router.put('/products/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, deleteProduct);

// Orders
router.post('/orders', createOrder);
router.get('/orders', authMiddleware, adminMiddleware, getOrders);
router.get('/orders/:id', authMiddleware, adminMiddleware, getOrderById);
router.put('/orders/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

// Users
router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// Notifications
router.post('/notifications/subscribe', authMiddleware, subscribe);
router.get('/notifications/preferences', authMiddleware, require('../controllers/notificationController').getPreferences);
router.put('/notifications/preferences', authMiddleware, require('../controllers/notificationController').updatePreferences);

module.exports = router;
