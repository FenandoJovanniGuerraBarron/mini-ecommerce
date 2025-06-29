require("dotenv").config();

module.exports = {
  api: {
    jwtSecret: process.env.JWT_SECRET,
  },
};