var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var routes = function (School) {
    var school_router = express.Router();
        school_router.post("/", function (req, res) {
        console.log("post method get called");
        console.log("school_name", req.body.school_name);
        /* var payLoad={
          "school_name":req.body.school_name,
          "user_name":req.body.user_name
        }; */
        var newSchool = new School(req.body);
        School.create(newSchool, function (err, result) {
            if (err) {
                return res.status(501).send({
                        "status": 501,
                        "message": "Internal Server Error",
                        "data": err

                    }

                );
            }

            if (result) {
                return res.status(201).send(result);

            }

        });
    });

    // update , user , password 
    // user  send ,email and password
        school_router.put("/", function (req, res) {

        var email = req.body.email;
        var pwd = req.body.password;
        var salt = bcrypt.genSaltSync(10);
        var encrPwd = bcrypt.hashSync(pwd, salt);

        // var query = { name: 'bourne' };
        //  User.update(query, { email: 'israr' }, options, callback)

        School.findOne({
            email: email
        }, function (err, doc) {
            if (err) {

                return res.send(401).send(err);
            }
            doc.password = encrPwd;
            doc.save();
            return res.status(201).send(doc);

        });

    });
    school_router.get("/", function (req, res) {
        
        School.find({}, function (err, schools) {

            if (err) {

                return res.status(500).json({
                    "status_code": 500,
                    "message": "Internal Server Error"
                });

            } else {
                console.log("no error occured");
                return res.status(200).json(schools);
            }

        });

    });
     school_router.post("/login", function (req, res) {
        var query = {
            "user_name": req.body.user_name,
            "user_password": req.body.user_password
        };
        School.findOne(query, function (err, school) {
            if (!err) {
                if (school) {
                    return res.status(200).send(school);
                } else {
                    return res.status(404).json(school);
                    // return res.status(404).send({message:"Invalid user name or password"});
                }
            }
            return res.send(500).send({
                "message": err
            });
        });
    });
    school_router.get("/:school_id", function (req, res) {
        var query={};
        if(req.params['school_id']){
            query._id=req.params['school_id'];
        }
        School.findOne(query, function (err, school) {

            if (err) {

                return res.status(500).json({
                    "status_code": 500,
                    "message": "Internal Server Error"
                });

            } else {
                console.log("no error occured");
                return res.status(200).json(school);
            }

        })});

    return school_router;
}

module.exports = routes;