const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000, // 1 hour
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests from this IP, please try again later.",
    });
  },
});

module.exports = rateLimiter;
