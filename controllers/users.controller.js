const userService = require('../services/users.service');

const userController = {

    async createUser(req, res) {
        try {
            const { name } = req.body;


            console.log("Body", req.body);

            await userService.createUser(name)
                .then(user => {
                    res.status(201).json(user)
                })
                .catch((error) => {
                    res.status(400).send
                })

        } catch (error) {
            res.status(400).send(error);
        }
    },

    async getUsers(req, res) {

        console.log("Get Users");
        try {
            await userService.getUsers()
                .then(users => {
                    res.status(200).json(users);
                })
                .catch((error) => {
                    res.status(400).send(error);
                })
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = userController;