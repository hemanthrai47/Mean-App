const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors')
var port = process.env.PORT | 3000;
mongoose.connect("mongodb://localhost:27017/ola",function(){
    console.log("connceted with database")
})
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//cors issue resolver
app.use(cors());

var test = require('./router/router.js');
app.use('/api',test);



app.listen(3000,function(){
    console.log("web server conncected at", port)
})

