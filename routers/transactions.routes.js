const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactions.controller');

router.post('/', transactionController.createTransaction);
router.get('/group', transactionController.groupTransactionsByEdge);
router.get('/:userId', transactionController.getTransactionsBySender);

module.exports = router;