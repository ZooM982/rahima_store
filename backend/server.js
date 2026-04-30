const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const seedAdmin = require("./config/seedAdmin");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const apiRoutes = require("./routes/api");
const { swaggerUi, specs } = require("./config/swagger");
const { backfillSlugs } = require("./controllers/productController");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const xss = require("xss-clean");

// Connect to Database
connectDB().catch(err => {
    console.error("Database connection failed:", err.message);
});

const app = express();
const PORT = process.env.PORT || 5000;

// Trust Proxy (Required for Render/Vercel behind a proxy)
app.set("trust proxy", 1);

const allowedOrigins = [
	"https://rahima-store.vercel.app",
	"https://www.rahima-store.vercel.app",
	"https://rahima-store-frontend.vercel.app",
	"https://rahima.store",
	"https://www.rahima.store",
	"http://localhost:5173",
	"http://localhost:3000",
    process.env.FRONTEND_URL
].filter(Boolean);

// 1. CORS - MUST BE FIRST
app.use(cors({
	origin: allowedOrigins,
	credentials: true,
	optionsSuccessStatus: 204,
}));

// Logging middleware to debug
app.use((req, res, next) => {
	const origin = req.headers.origin;
	if (origin) {
        console.log(`${req.method} ${req.url} - Origin: ${origin}`);
    }
	next();
});

// 2. Security Middlewares
app.use(
	helmet({
		contentSecurityPolicy: false,
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: { policy: "cross-origin" },
		frameguard: {
			action: "deny",
		},
	}),
);
// app.use(xss());
app.use(hpp());

// 3. Rate Limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});
app.use("/api/auth/login", limiter);
app.use("/api/auth/register", limiter);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

// API Routes
app.use("/api", apiRoutes);
app.use("/", apiRoutes); // Support pour les requêtes où Vercel retire le préfixe /api
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
	res.send("Rahima Store API is running...");
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(
		`Server is running in ${process.env.NODE_ENV || "development"} mode on port  ${PORT}`,
	);
});

module.exports = app;
