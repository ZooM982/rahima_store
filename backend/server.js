const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const apiRoutes = require('./routes/api');
const { swaggerUi, specs } = require('./config/swagger');
const { backfillSlugs } = require('./controllers/productController');

// Connect to Database
connectDB().then(() => {
  seedAdmin();
  backfillSlugs(); // Generate slugs for existing products
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Permet toutes les origines pour corriger le blocage en production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api', apiRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('Rahima Store API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port  ${PORT}`);
});

