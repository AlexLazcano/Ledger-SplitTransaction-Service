const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
// const splitTransactionsController = require('../controllers/splitTransactions.controller');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

// router.post('/', splitTransactionsController.createSplitTransaction);
// router.get('/', splitTransactionsController.getAllSplitTransactions);
// router.delete('/:id', splitTransactionsController.deleteSplitTransaction);
// router.get('/group', splitTransactionsController.groupSplitTransactionsByEdge);
// router.get('/:userId', splitTransactionsController.getSplitTransactionsBySender);

module.exports = router;