const mongoose = require('mongoose');

var driver = new mongoose.Schema({
    name : String,
    email : String,
    phone : Number,
    password : String    
})

module.exports = mongoose.model("drivers", driver, 'dirversCollection')