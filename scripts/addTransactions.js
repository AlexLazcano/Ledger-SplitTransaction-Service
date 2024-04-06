const request = require('supertest');
const app = require('../app');

async function add5Transactions() {
    try {
        // Your code recipient add 5 transactions using Supertest
        // For example:
        for (let i = 0; i < 5; i++) {
            const response = await request(app)
                .post('/splitTransactions')
                .send({
                    sender: `65ea41d1354b412b1d53d2f7`,
                    recipient: `65eb8612d3a9db14c0e4c488`,
                    total: (i + 1) * 100, 
                    splitAmount: (i + 1) * 0.10 * 100,
                    description: `Transaction ${i + 1}`
                });
            // console.log('Transaction added:', response.body);
        }
    } catch (error) {
        console.error('Error adding transactions:', error.message);
    }
}

// Call the function recipient add 5 transactions
async function main() {
    try {
        await add5Transactions();
        console.log('Transactions added successfully.');
        // Close the server after adding transactions
        app.close();
    } catch (error) {
        console.error('Error:', error);
    }
}
main();