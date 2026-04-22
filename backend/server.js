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

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');

// Connect to Database
connectDB().then(() => {
  seedAdmin();
  backfillSlugs(); // Generate slugs for existing products
});

const app = express();
const PORT = process.env.PORT || 5000;

// 1. CORS - Must be first
app.use(cors({
  origin: [
    'https://rahima-store.vercel.app',
    'https://www.rahima-store.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// 2. Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  frameguard: {
    action: 'deny'
  }
})); 
app.use(xss());
app.use(hpp());

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use('/api/auth/login', limiter);
app.use('/api/auth/register', limiter);

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

