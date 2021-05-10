const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    mrp: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    isPublished: DataTypes.BOOLEAN
}, {timestamps: false});

module.exports = Product;
