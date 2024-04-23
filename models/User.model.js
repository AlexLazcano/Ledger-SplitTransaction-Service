const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_conn');

console.log('defining model user');

const User = sequelize.define('Users',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Users',
        timestamps: false
    }
);

// (async () => {
//     console.log('Creating User table');
//     try {
//         await User.sync({force: false});
//         console.log('User table created');
//     } catch (error) {
//         console.error('Error creating User table:', error);
//     }
// })();

module.exports = User;