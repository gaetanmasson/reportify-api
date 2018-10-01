const path = require("path");

// import .env variables
require("dotenv-safe").load({
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example")
});

module.exports = {
  authEmail: {
    host: process.env.EMAIL_HOST,
    password: process.env.EMAIL_PASSWORD,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER
  },
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI
  },
  port: process.env.PORT
};
