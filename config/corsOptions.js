const corsOptions = {
  origin: ["http://localhost:5173", "http://account.visionlumbini.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = corsOptions;
