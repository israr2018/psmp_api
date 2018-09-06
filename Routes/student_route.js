var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var routes = function (StudentReg) {
    var student_router = express.Router();
    student_router.post('/', function (req, res) {
        
        var newStudent = new StudentReg(req.body);
        
        StudentReg.create(newStudent, function (err, result) {
            if (err) {
                
                return res.status(500).send(err);
            }

                return res.status(201).send(result);

        });

    });
    student_router.get('/:school_id/:class_level', function (req, res) {

        var query = {

        };
        if (req.params['school_id']) {
            query.school_id = req.params['school_id'];

        }
        if (req.params['class_level']) {
            query.class_level = req.params['class_level'];
            
        }
       
        StudentReg.find(query, function (err, result) {
            if (err) {
                console.log("server error");
                return res.status(500).send("Server error");
            }

            return res.status(200).send(result);
        });
    });
    student_router.put("/:id", function (req, res) {
        
        StudentReg.findById(req.params.id, function (err, student) {
            if (err) {
                return res.status(500).send("Error");
            }
            //  console.log(req.body.attendence[0].attendence_register[8].mark[0]);
            //student.attendence[0].attendence_register[8].mark.push(req.body.attendence[0].attendence_register[8].mark[0]);
            //console.log("student.....",student.attendence[0]);
           // console.log(student.attendence[0])
           // student = student.attendence.slice();
          //  student=req.body;
           // console.log(student.attendence[0]);
              //  student.student_name=req.body.student_name;
               // student.attendence=student.attendence.slice();
                student.attendence=req.body.attendence;
                student.save(function (err, updatedStudent) {
                if (err) {
                    console.log("error...", err);
                    return res.status(500).send("error occured on server");
                }
                console.log("updatedStudent",updatedStudent);
                res.status(200).send(updatedStudent);
            });
           
        });
    });
    student_router.post("/mark_attendence", function (req, res) {
        console.log("....update new version.....");
        var  student=new StudentReg();
         studentReg=req.body;
         student.save(function (err, uppdatedStudent) {
            if (err) {
                console.log("error...", err);
                return res.status(500).send("error occured on server");
            }
            res.status(200).send(uppdatedStudent);
        });
       
    });
   
    return student_router;
}

module.exports = routes;