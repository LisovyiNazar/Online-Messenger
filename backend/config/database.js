const Sequelize = require("sequelize")

const db = new Sequelize("messenger", "root", "", {
    host: "localhost",
    port: "3307",
    dialect: "mysql"
});

module.exports = db