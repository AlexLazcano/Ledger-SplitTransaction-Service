const SplitTransactions = require('../models/SplitTransaction.model');
const User = require('../models/User.model');

const splitTransactionService = {
    async createSplitTransaction(user_id1, user_id2, total, splitAmount, date, description) {

        try {

            const newSplitTransaction = new SplitTransactions({ from: user_id1, to: user_id2, total: total, splitAmount: splitAmount, date, description });

            const savedSplitTransaction = await newSplitTransaction.save();

            console.log('Transaction created:', savedSplitTransaction);
            return savedSplitTransaction;
        } catch (error) {
            throw new Error('Error creating Transaction');
        }
    },
    async getSplitTransactionsByFilter(filter) {
        try {
            const filteredSplitTransactions = await SplitTransactions.find(filter)
                .populate('from', 'name _id')
                .populate('to', 'name _id')
                .lean()
                .exec();

            // Convert ObjectId to string for the populated 'from' field
            filteredSplitTransactions.forEach(transaction => {
                if (transaction.from && transaction.from._id) {
                    transaction.from.id = transaction.from._id.toString();
                    delete transaction.from._id;
                }
                if (transaction.to && transaction.to._id) {
                    transaction.to.id = transaction.to._id.toString();
                    delete transaction.to._id;
                }
            });



            console.log('Filtered Split Transactions:', filteredSplitTransactions);
            return filteredSplitTransactions;
        } catch (error) {
            throw new Error('Error fetching Split Transactions by filter');
        }
    },
    async deleteSplitTransactionsByFilter(filter) {
        try {
            // Use the deleteMany method to remove multiple documents based on the filter
            const result = await SplitTransactions.deleteMany(filter);
            console.log(`${result.deletedCount} split transactions deleted`);
            return result;
        } catch (error) {
            throw new Error('Error deleting split transactions');
        }
    },

    async getSplitTransactionsBySender(userId) {
        try {

            const transactions = await SplitTransactions.find({ from: userId });

            return transactions;
        } catch (error) {
            throw error;
        }
    },

    async groupSplitTransactionsByEdge() {
        try {
            const aggregatedSplitTransactions = await SplitTransactions.aggregate([
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
            return aggregatedSplitTransactions;
        } catch (error) {
            throw error;
        }
    }



    // Additional methods for updating, deleting, etc.
};

module.exports = splitTransactionService;
