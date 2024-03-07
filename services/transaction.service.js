const Transactions = require('../models/Transaction.model');

const transactionService = {
    async createTransaction(user_id1, user_id2, amount, date, description) {

        try {

            const newTransaction = new Transactions({ from: user_id1, to: user_id2, amount, date, description });

            const savedTransaction = await newTransaction.save();

            console.log('Transaction created:', savedTransaction);
            return savedTransaction;
        } catch (error) {
            throw new Error('Error creating Transaction');
        }
    },

    async getTransactionsBySender(userId) {
        try {

            const transactions = await Transactions.find({ from: userId });

            return transactions;
        } catch (error) {
            throw error;
        }
    },

    async groupTransactionsByEdge() {
        try {
            const aggregatedTransactions = await Transactions.aggregate([
                {
                    $group: {
                        _id: { from: "$from", to: "$to" }, // Group by the sender and receiver's user IDs
                        totalAmount: { $sum: "$amount" }, // Calculate the total amount for each sender-receiver pair
                        count: { $sum: 1 } // Count the number of transactions for each sender-receiver pair
                    }
                },
                {
                    $lookup: {
                        from: "users", // Assuming the user collection name is "users"
                        localField: "_id.from",
                        foreignField: "_id",
                        as: "fromUser"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id.to",
                        foreignField: "_id",
                        as: "toUser"
                    }
                },
                {
                    $project: {
                        _id: {
                            from: "$_id.from",
                            to: "$_id.to"
                        },
                        from: { $arrayElemAt: ["$fromUser.name", 0] },
                        to: { $arrayElemAt: ["$toUser.name", 0] },
                        totalAmount: 1,
                        count: 1
                    }
                }
            ]);
            return aggregatedTransactions;
        } catch (error) {
            throw error;
        }
    }



    // Additional methods for updating, deleting, etc.
};

module.exports = transactionService;
