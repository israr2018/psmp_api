var express=require('express');
const mongoose=require('mongoose');

const Schema=mongoose.Schema;
var routes=function(CarMakes)
 {
    var carMakesRouter=express.Router();
    carMakesRouter.route('/')
    .post(function (req,res) {
    
        var carMakes=new CarMakes(req.body);
        carMakes.save();
        console.log(carMakes);
       
         res.status(201).send(carMakes);
        // res.send(CarMakes);
 
    })
    .get(function (req,res) {
        

        
       // console.log(" get method is called");
        var query={};
        if(req.query._id){
           query._id=req.query._id;
        }
      
       // res.send(resJson);
      CarMakes.find(query,function (err,carMakes) {
          if(!err)
           {
            res.status(200).json(carMakes);
            console.log(carMakes);
           } 
       });
    });
    carMakesRouter.use('/:carMakesId', function(req,res,next){
        console.log(req.params.carMakesId);
        CarMakes.findById(req.params.carMakesId, function(err,carMakes){
            if(err)
                res.status(500).send(err);
            else if(carMakes)
            {
                req.carMakes = carMakes;
                next();
            }
            else
            {
                res.status(404).send('no CarMakes found');
            }
        });
    });
    
    carMakesRouter.route('/:carMakesId')
    .get(function(req,res){

      //  res.json(req.carMakes);

      CarMakes.findById(req.params.carMakesId, function(err,carMakes){
        if(err)
            res.status(500).send(err);
        else 
        {
            //req.carMakes = carMakes;
            //next();
            res.status(200).json(carMakes);
        }
       
    });

    })
    .put(function(req,res){
        req.CarMakes.Title = req.body.Title;
        req.CarMakes.Author = req.body.Author;
        req.CarMakes.Price = req.body.Price;
        req.CarMakes.Genere = req.body.Genere;
        req.CarMakes.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.CarMakes);
            }
        });
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body)
        {
            req.CarMakes[p] = req.body[p];
        }

        req.CarMakes.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.CarMakes);
            }
        });
    })
    .delete(function(req,res){
        req.CarMakes.remove(function(err){

            if(err){

                res.status(500).send(err);
            }
            else{
                res.status(204).send('Removed');

            }

        })

    })
  
    
return carMakesRouter;
}




module.exports=routes;