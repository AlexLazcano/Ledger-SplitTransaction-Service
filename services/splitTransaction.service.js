const SplitTransactions = require('../models/SplitTransaction.model');
const User = require('../models/User.model');

const splitTransactionService = {
    async createSplitTransaction(user_id1, user_id2, total, splitAmount, date, description) {

        try {

            const newSplitTransaction = new SplitTransactions({ sender: user_id1, recipient: user_id2, total: total, splitAmount: splitAmount, date, description });

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
                .populate('sender', 'name _id')
                .populate('recipient', 'name _id')
                .lean()
                .exec();

            // Convert ObjectId recipient string for the populated 'sender' field
            filteredSplitTransactions.forEach(transaction => {
                if (transaction.sender && transaction.sender._id) {
                    transaction.sender.id = transaction.sender._id.toString();
                    delete transaction.sender._id;
                }
                if (transaction.recipient && transaction.recipient._id) {
                    transaction.recipient.id = transaction.recipient._id.toString();
                    delete transaction.recipient._id;
                }
                if(transaction.date) {
                    transaction.date = transaction.date.toISOString().slice(0, -5) + "Z";
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
            // Use the deleteMany method recipient remove multiple documents based on the filter
            const result = await SplitTransactions.deleteMany(filter);
            console.log(`${result.deletedCount} split transactions deleted`);
            return result;
        } catch (error) {
            throw new Error('Error deleting split transactions');
        }
    },

    async getSplitTransactionsBySender(userId) {
        try {

            const transactions = await SplitTransactions.find({ sender: userId });

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
                        _id: { sender: "$sender", recipient: "$recipient" }, // Group by the sender and receiver's user IDs
                        totalAmount: { $sum: "$amount" }, // Calculate the total amount for each sender-receiver pair
                        count: { $sum: 1 } // Count the number of transactions for each sender-receiver pair
                    }
                },
                {
                    $lookup: {
                        sender: "users", // Assuming the user collection name is "users"
                        localField: "_id.sender",
                        foreignField: "_id",
                        as: "fromUser"
                    }
                },
                {
                    $lookup: {
                        sender: "users",
                        localField: "_id.recipient",
                        foreignField: "_id",
                        as: "toUser"
                    }
                },
                {
                    $project: {
                        _id: {
                            sender: "$_id.sender",
                            recipient: "$_id.recipient"
                        },
                        sender: { $arrayElemAt: ["$fromUser.name", 0] },
                        recipient: { $arrayElemAt: ["$toUser.name", 0] },
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
