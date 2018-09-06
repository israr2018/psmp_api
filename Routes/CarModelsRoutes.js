var express=require('express');
const mongoose=require('mongoose');

const Schema=mongoose.Schema;
var routes=function(CarModels)
 {
    var carModelsRouter=express.Router();
    carModelsRouter.route('/')
    .post(function (req,res) {
    
        var carModel=new CarModels(req.body);
        carModel.save();

        
        console.log(carModel);
       
         res.status(201).send(carModel);
        // res.send(CarAds);
 
    })
    .get(function (req,res) {
        

        
       // console.log(" get method is called");
        var query={};
        if(req.query.Price){
           query.Price=req.query.Price;
        }
      
       // res.send(resJson);
      CarModels.find(query,function (err,carModels) {
          if(!err)
           {
            res.status(200).json(carModels);
            console.log(carModels);
           } 
       });
    });

    carModelsRouter.use('/:carModelsId', function(req,res,next){
       
        CarModels.find({car_make_id:req.params.carModelsId}, function(err,carModel){
            if(err)
                res.status(500).send(err);
            else if(carModel)
            {
                req.carModel = carModel;
                next();
            }
            else
            {
                res.status(404).send('no CarModel was  found');
            }
        });
    });
    carModelsRouter.route('/:carModelsId')
    .get(function(req,res){

        res.json(req.carModel);

    })
    .put(function(req,res){
        req.CarModel.Title = req.body.Title;
        req.CarModel.Author = req.body.Author;
        req.CarModel.Price = req.body.Price;
        req.CarModel.Genere = req.body.Genere;
        req.CarModel.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.CarAds);
            }
        });
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body)
        {
            req.CarAds[p] = req.body[p];
        }

        req.CarAds.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.CarAds);
            }
        });
    })
    .delete(function(req,res){
        req.CarAds.remove(function(err){

            if(err){

                res.status(500).send(err);
            }
            else{
                res.status(204).send('Removed');

            }

        })

    })
  
    
return carModelsRouter;
}




module.exports=routes;