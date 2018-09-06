var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var routes = function (User) {
    var authRouter = express.Router();
   
    // Post Method , authenticate user and send token along 
    // payLoad{user_email,user_role}
    authRouter.post("/", function (req, res) {
        const user = new User();
        const password = req.body.password;
        var query={};
        query.email=req.body.email;
        User.findOne(query,function (err, result) {
            if (err) {
                return res.status(501).send(
                    {
                        "status":501,
                        "message":"Internal Server Error",
                        "data":error
    
                    }

                );
            }

            if(!result){
                return res.status(200).send({
                    "status":1,
                    "message":"Invalid Email",
                    "data":result

                });

            }
          

            console.log("result email",result.email);
            console.log("result password",result.password);
            if(!bcrypt.compareSync(req.body.password,result.password))
            {
            return res.status(200).send({
                "status":2,
                "message":"Invalid Passoword",
                "data":result
            
            });
            }
            const payLoad = {

                "user_email": result.email,
                "user_role": result.role

            }
            const token = jwt.sign(payLoad, "test", { expiresIn: '1h' });
            console.log("token generated:"+token);
            return res.status(200).send({
                "message": "Successfully athenticated",
                "token": token,
                "status":200


            });
           
        });
    });
    
    // update , user , password 
    // user  send ,email and password
    authRouter.put("/",function(req,res){

        var email=req.body.email;
        var pwd=req.body.password;
        var salt=bcrypt.genSaltSync(10);
        var encrPwd = bcrypt.hashSync(pwd, salt);

        // var query = { name: 'bourne' };
        //  User.update(query, { email: 'israr' }, options, callback)

        User.findOne({email:email},function(err,doc){
            if(err){

                return res.send(401).send(err);
            }
            doc.password=encrPwd;
            doc.save();
            return res.status(201).send(doc);

        });
  
    });
    



    return authRouter;
};

 

module.exports = routes;