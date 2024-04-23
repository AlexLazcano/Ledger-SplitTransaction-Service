const sequelize = require('../config/db_conn');
const User = require('../models/User.model');

const userService = {
    async createUser(name) {
        console.log('Creating user', name);
        try {
            const newUser = await User.create({ name });

            console.log('User created:', newUser.toJSON());
            return 
            
        } catch (error) {
            throw new Error('Error creating Transaction');
        }
    },

    async getUsers() {

        try {
            console.log('Fetching users');
            // const users = await User.findAll();

            const [users, metadata] = await sequelize.query('SELECT * FROM Users');
            
            console.log('Users:', users);

            return users

        } catch (error) {
            throw new Error('Error getting users');
        }
    }

    // Additional methods for updating, deleting, etc.
};

module.exports = userService;
