const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_conn');
const User = require('./User.model'); // Assuming User model is defined in User.js

const Transactions = sequelize.define('Transactions', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    split_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'Transactions',
    timestamps: false
});

// Define associations
Transactions.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
Transactions.belongsTo(User, { as: 'recipient', foreignKey: 'recipient_id' });

module.exports = Transactions;