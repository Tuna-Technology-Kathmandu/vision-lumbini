const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const rid = require("connect-rid");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const rateLimiter = require("./config/rateLimiter");
const helmetConfig = require("./config/helmetConfig");
const connectDB = require("./config/database");

dotenv.config();
// database connection to db
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;
const VERSION = process.env.VERSION || "/api/v1";

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(rid());
app.use(rateLimiter);
helmetConfig.forEach((middleware) => app.use(middleware));

app.get("/", (req, res) => {
  res.send("API is running...");
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

/**
 * routing for api
 */
const authRoutes = require("./router");
app.use(VERSION, authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
