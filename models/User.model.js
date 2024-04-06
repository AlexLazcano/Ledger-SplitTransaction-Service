const mongoose = require('mongoose');


const { Schema, model } = mongoose;

console.log('User.model.js');
const userSchema = new Schema({
    name: String,
});

const User = model('User', userSchema);
module.exports = User;