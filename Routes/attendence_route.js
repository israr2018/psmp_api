var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var routes = function (Attendence) {
    var attendence_router = express.Router();
   
    attendence_router.get('/:date', function (req, res) {
        var query = {

        };
        console.log(req.params['date'])
        if (req.params['date']) {
            query.date= req.params['date'];

        }
        
        Attendence.find(query, function (err, result) {
            if (err) {
                console.log("server error");
                return res.status(500).send("Server error");
            }
            
            return res.status(200).send(result);
        });
    });
   
    attendence_router.post("/mark_attendence", function (req, res) {
        console.log("marke attendence route")
        var new_attendence = new Attendence(req.body);
        console.log("attendence",new_attendence);
        Attendence.create(new_attendence, function (err, result) {
            if (err) {
                
                return res.status(500).send(err);
            }

                return res.status(201).send(result);

        }); 
    });
    
    return attendence_router;
}

module.exports = routes;