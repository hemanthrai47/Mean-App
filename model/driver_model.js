const mongoose = require('mongoose');

var driver = new mongoose.Schema({
    name :{
        type : String
    }, 
    email :{
        type : String,
        required : true,
        unique : true
    },
    phone :{
        type : String,
    },
    password :{
        type : String,
        required : true
    },
    admin : String    
})

module.exports = mongoose.model("drivers", driver, 'dirversCollection')