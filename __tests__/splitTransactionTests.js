
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');


describe('Split Transaction Service', () => {

    let server;

    beforeAll(done => {
        server = app.listen(3000, done);
    });

    afterAll(done => {
        
        mongoose.connection.close();
        server.close(done);
    });



    test('POST /createSplitTransaction should create a new split transaction', async () => {

        const reqBody = {
            from: '65ea41d1354b412b1d53d2f7',
            to: '65eb8612d3a9db14c0e4c488',
            total: 100,
            splitAmount: 50,
            date: new Date(),
            description: 'Test Split Transaction'
        };

        const response = await request(app)
            .post('/splitTransactions')
            .send(reqBody)
            .expect(201);

        const { from, to, total, splitAmount, date, description } = response.body;

        expect(from).toBe(reqBody.from);
        expect(to).toBe(reqBody.to);
        expect(total).toBe(reqBody.total);
        expect(splitAmount).toBe(reqBody.splitAmount);
        expect(response.body).toHaveProperty('date');
        expect(description).toBe(reqBody.description);


        // Add more assertions as needed
    });




});
