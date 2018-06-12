const route = require('express').Router();
const drivers = require('../model/driver_model.js')
route.use(function(req,res,next){
    console.log('first test route executed')
    next();
})

route.get('/drivers', function(req,res){
    drivers.find({},function(err,drivs){
        if(err){
            res.send(err)
        }
        res.json(drivs)
    })
})

route.post('/driverRegister',function(req,res){
   var driver = new drivers({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone
    })
    driver.save(function(err,node){
        res.send({succuss : "True",message : "succesfully stored", arr : node})
    })
})



route.put('/driverRegister/:id',function(req,res){

})

route.get('/',function(req,res){
    res.send({test : "testing is successfull"})
})

module.exports = route;