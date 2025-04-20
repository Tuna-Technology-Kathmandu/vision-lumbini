const jwt = require("jsonwebtoken");

const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
      }

      const payload = { unique_id: decoded.unique_id, role: decoded.role };

      const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
      );

      const newRefreshToken = jwt.sign(
        { unique_id: decoded.unique_id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    });

  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({ message: "Server error during token refresh" });
  }
};

module.exports = refreshTokenController;
