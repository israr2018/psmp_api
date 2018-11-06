var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var routes = function (Class) {
    var class_router = express.Router();
    class_router.post('/', function (req, res) {
        console.log("post method of of class route is get called");
        var newClass = new Class(req.body);
        console.log(newClass);
        Class.create(newClass, function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(201).send(result);

        });

    });
    class_router.get('/:school_id', function (req, res) {
        console.log(req.params['school_id']);
        var query = {

        };
        if (req.params['school_id']) {
            query.school_id = req.params['school_id'];
        }

        Class.find(query, function (err, result) {
            if (err) {
                console.log("server error");
                return res.status(500).send("Server error");
            }
            return res.status(200).send(result);
        });
    });
    class_router.get('/:school_id/:class_level', function (req, res) {
        console.log("route classes/school_id/class_level",req.params['school_id']);
        var query = {

        };
        if (req.params['school_id']) {
            query.school_id = req.params['school_id'];
        }
        if (req.params['class_level']) {
            query.class_level = req.params['class_level'];
        }
        const todayDate=new Date().toISOString().split('T')[0]
        Class.findOne(query, function (err, classToUpdate) {
                if (err) {
                
                return res.status(500).send("Server error");
                
                }

                const todayDate=new Date().toISOString().split('T')[0];
                //return res.status(200).send({"date":todayDate});
                classToUpdate.today_date = todayDate;
                
                classToUpdate.save(function (err2) {
                    if (err2) {
                       return res.status(500).send("error"+err2);
                    }
                       return  res.status(200).send(classToUpdate);
                    
                });
              
        });
    });

    return class_router;
}

module.exports = routes;