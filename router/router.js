const route = require('express').Router();
const drivers = require('../model/driver_model.js');
const jwt = require('jsonwebtoken')




route.post('/loginDriver',function(req,res){
    drivers.findOne({email : req.body.email},function(err,driver){
        console.log(driver)
        if(err){
            return res.send(err)
        }
        if(driver == null){
            res.send({
                message : 'The user is not register'
            })
        }
        else if(driver.password !== req.body.password){
            res.status(200).send({
                status : 0,
                message : "please check ua password"
            })
        }else{
            var payload = {
                email : req.body.email
            }
            var token = jwt.sign(payload,"superSecret")
            res.status(200).json({
                success : "true",
                message : "succesfull logedin",
                token : token
            })
        }
        
    })

})
route.use(function(req,res,next){
    console.log(req.query)
    var token =  req.params.token || req.query.token || req.body.token
    if(token){
        jwt.verify(token, "superSecret",function(err,decoded){
            if(err){
                res.send({
                    message : "the token is not valid"
                })
            }
            else{
                req.decoded = decoded;
                next();
            }
        })
    }
    else  if(!token){
        res.send({
            message : 'Your not authenticated user'
        })
    } 
})

route.get('/drivers', function(req,res){
    // console.log(req.params)
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
        phone : req.body.phone,
        password : req.body.password
    })
    driver.save(function(err,node){
        res.send({succuss : "True",message : "succesfully stored", arr : node})
    })
})



route.put('/driverRegister/:id',function(req,res){
    drivers.findOne({_id : req.params.id},function(err,user){
        if(err){
            res.send(err)
        }
        for(prop in req.body){
            user[prop] = req.body[prop] 
        }
        user.save(function(err){
            if(err){
                res.send(err)
            }
            res.send({success : "true", message : "succesfully updated the drivers info"})
        })

    })

})
route.delete('/driverRegister/:id',function(req,res){
    drivers.remove({ _id: req.params.id}, function(err,user){
        if(err){
            res.send(user)
        }
        res.send({message : 'succesfully deleted'})
    })
})

route.get('/',function(req,res){
    res.send({test : "testing is successfull"})
})

module.exports = route;