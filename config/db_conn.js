const { Sequelize } = require('sequelize');

let cachedDb = null;

const connectToDatabase = async () => {
    if (cachedDb) {
        console.log("Using cached database connection");
        return cachedDb;
    }

    // const connectionString = process.env.MYSQL_URL || "";
    // console.log('Connecting to MYSQL', connectionString);
    const database = process.env.MYSQL_DATABASE || 'Ledger';
    const username = process.env.MYSQL_USERNAME || 'root';
    const password = process.env.MYSQL_PASSWORD || 'password';


    try {
        const sequelize = new Sequelize(database, username, password, {
            host: 'localhost',
            dialect: 'mysql',
            logging: false
        });

        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully to MYSQL');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
        });
        
        cachedDb = sequelize; // Cache the database connection

        console.log("Connected to MYSQL");
        return cachedDb;
    } catch (error) {
        console.error("Error connecting to MYSQL:", error);
        throw error;
    }
};

module.exports = connectToDatabase;
