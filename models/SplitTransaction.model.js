const mongoose = require('mongoose');


const { Schema, model } = mongoose;

const splitTransactionSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    total: {required: true, type: Number},
    splitAmount: {required: true, type: Number},
    date: Date,
    description: String
});

const SplitTransactionModel = model('SplitTransaction', splitTransactionSchema);
module.exports = SplitTransactionModel;