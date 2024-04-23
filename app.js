const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3001;

// const sequelize = require('./config/db_conn.js');
// const splitTransactionRoutes = require('./routers/splitTransactions.routes.js');
const userRoutes = require('./routers/users.routes.js');
const transactionRoutes = require('./routers/transactions.routes.js');

app.use(cors());
app.use(express.json());
console.log('Hello from User API');

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})


module.exports = app;