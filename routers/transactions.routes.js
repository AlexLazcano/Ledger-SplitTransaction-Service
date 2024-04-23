const express = require('express');
const router = express.Router();
const TransactionsController = require('../controllers/transactions.controller');


router.get('/', TransactionsController.getTransactions);
router.post('/', TransactionsController.createTransaction);
// router.post('/', splitTransactionsController.createSplitTransaction);
// router.get('/', splitTransactionsController.getAllSplitTransactions);
// router.delete('/:id', splitTransactionsController.deleteSplitTransaction);
// router.get('/group', splitTransactionsController.groupSplitTransactionsByEdge);
// router.get('/:userId', splitTransactionsController.getSplitTransactionsBySender);

module.exports = router;