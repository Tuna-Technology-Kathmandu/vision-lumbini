const helmet = require("helmet");

const helmetConfig = [
  helmet(),
  helmet.frameguard({ action: "deny" }),
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  }),
  helmet.noSniff(),
  helmet.xssFilter(),
];

module.exports = helmetConfig;
