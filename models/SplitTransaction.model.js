const mongoose = require('mongoose');


const { Schema, model } = mongoose;

const splitTransactionSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    total: Number,
    splitAmount: Number,
    date: Date,
    description: String
});

const SplitTransaction = model('SplitTransaction', splitTransactionSchema);
module.exports = SplitTransaction;