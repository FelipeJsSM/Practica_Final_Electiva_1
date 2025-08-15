const { Sequelize } = require("sequelize");
const path = require("path");

const storagePath = path.resolve(__dirname, "../database/booksapp.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false
});

module.exports = sequelize;