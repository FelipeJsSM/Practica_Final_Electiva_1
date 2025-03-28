const Sequelize = require("sequelize");

const sequelize = require("../context/appContext");

const Books = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  published: {
    type: Sequelize.STRING(4),
    allowNull: false,
  },
  imagePath: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Books;