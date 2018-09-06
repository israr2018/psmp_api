var express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const multer = require("multer");
const upload = multer({
    dest: "uploads/"
});
var twilio = require("twilio");
var fs = require("fs");
var sms_service = require("./../common/sms.service");

var routes = function (CarAds) {
    var carAdRouter = express.Router();
    carAdRouter
        .route("/")
        .post(upload.array("car_image", 12), function (req, res) {
            console.log("file", req.files);
            //  console.log(req.body.car_description);
            console.log("data in body", req.body);
            const carAd = new CarAds(req.body);

            req.files.forEach(element => {
                carAd.car_image.push(element.filename);
            });

            carAd.car_make.make_name = req.body.car_make_name;
            carAd.car_make.make_id = req.body.car_make_id;
            carAd.car_make.madel_id = req.body.car_model_id;
            carAd.car_make.model_name = req.body.car_model_name;

            carAd.car_price = req.body.car_price;
            carAd.contact_number = req.body.contact_number;
            carAd.car_km_driven = req.body.car_km_driven;
            carAd.car_price = req.body.car_price;
            carAd.car_engine_type = req.body.car_engine_type;
            carAd.car_model_year = req.body.car_model_year;
            carAd.car_transmission_type = req.body.car_transmission_type;
            carAd.car_engine_capacity = req.body.car_engine_capacity;

            var varification_code = sms_service.generate_code();

            carAd.varification_code = varification_code;
            var message = sms_service.create_message(varification_code);

            sms_service.send_sms(carAd.contact_number, message, "MBZ");

            /*  formData.append("car_price",  this.model.car_price);
                   formData.append("car_km_driven",  this.model.km_driven);
                   formData.append("car_engine_type",  this.model.car_engine_type);
                   formData.append("car_model_year",  this.model.car_model_year);
                   formData.append("car_transmission_type",  this.model.car_transmission_type);
                   formData.append("car_engine_capacity",  this.model.car_engine_capacity);
                   formData.append("contact_number",  this.model.contact_number);
                   formData.append("car_model_id",  this.model.car_model_id); */

            /* formData.append("car_make_name",this.selectedCarMakeName);
            formData.append("car_make_id",this.selectedCarMakeId);
            formData.append("car_model_id",this.selectedCarModelId);
            formData.append("car_model_name",this.selectedCarModelName);
            formData.append("car_description",  this.model.car_description);
     */
            CarAds.create(carAd, function (err, carAd) {
                if (err) {
                    res.status(500).send("Something goes wrong please try later.");
                } else {
                    res.status(201).send(carAd);
                }
            });
        })
        .get(function (req, res) {
            // res.send(resJson);
            CarAds.find(function (err, carAds) {
                if (!err) {
                    res.status(200).json(carAds);
                }
            });
        });
        carAdRouter.route("/active/:is_active").get(function (req, res) {
          var query = {};
            if (req.params.is_active) {
            query.is_active = req.params.is_active;
            }

        CarAds.find(query, function (err, carAd) {
            if (err) {
                res
                    .status(200)
                    .send({
                        message: "Invalid Parameters" + req.params.is_active
                    });
            } else {
                return res.status(200).send(carAd);
            }
        });
    });

    carAdRouter
        .route("/:adId")
        .get(function (req, res) {
            CarAds.findById(req.params.adId, function (err, carAd) {
                if (err) {
                    res
                        .status(200)
                        .send({
                            message: "Invalid Car Ad Id:" + req.params.adId
                        });
                } else {
                    return res.status(200).send(carAd);
                }
            });
        })
        .put(function (req, res) {
            console.log("put method is get called");
            console.log("ad Id " + req.params.adId);

            // var ad_id=req.param.adId;
            if (!req.params.adId) {
                return res.status(404).json({
                    message: "Car Ad with id:" + req.params.adId + " could not found"
                });
            }

            CarAds.findById(req.params.adId, function (err, ad) {
                if (err) {
                    return res.send(501).send({
                        message: "Server error"
                    });
                }
                if (ad) {
                    //ad.car_model_year=req.body.car_model_year;
                    (ad.is_active = req.body.is_active),
                    (ad.car_model_year = req.body.car_model_year),
                    (ad.car_make = {
                        make_id: req.body.car_make.make_id,
                        make_name: req.body.car_make.make_name,
                        model_name: req.body.car_make.model_name
                    }),
                    (ad.car_description = req.body.car_description),
                    (ad.car_price = req.body.car_price),
                    (ad.car_km_driven = req.body.car_km_driven),
                    (ad.car_transmission_type = req.body.car_transmission_type),
                    (ad.car_engine_capacity = req.body.car_engine_capacity),
                    (ad.car_engine_type = req.body.car_engine_type);

                    ad.is_active = req.body.is_active;

                    ad.save(function (error, updatedAd) {
                        if (error) {
                            return res.status(401).json({
                                message: "Record could not updated"
                            });
                        } else {
                            return res.status(200).json(updatedAd);
                        }
                    });
                } else {
                    return res.status(404).send({
                        message: "Not Found"
                    });
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) delete req.body._id;

            for (var p in req.body) {
                req.CarAds[p] = req.body[p];
            }

            req.CarAds.save(function (err) {
                if (err) res.status(500).send(err);
                else {
                    res.json(req.CarAds);
                }
            });
        })
        .delete(function (req, res) {
            CarAds.findById(req.params.adId).exec(function (err, car_ad) {
                if (err) {
                    return res.status(501).json({
                        message: "Server error"
                    });
                }
                if (car_ad) {
                    var images = car_ad.car_image;
                    images.forEach(x => {
                        fs.unlink("uploads/" + x, function (err) {
                            if (err) {
                                console.log("file could not deleted", err);
                                return res.status(200).json({
                                    message: err
                                });
                            }
                        });
                    });
                    car_ad.remove(function (err, car_ad) {
                        if (err) {
                            console.log("Car Ad has been deleted");
                            return res.status(200).json({
                                message: "error in deleting"
                            });
                        }
                        return res
                            .status(200)
                            .json({
                                message: " Car Ad has been deleted"
                            });
                    });
                }
            });
        });
    carAdRouter.route("/varify_number/:code").get(function (req, res) {
       console.log(" varify number route is called");
        var code = req.params.code;
        console.log("code",code);
        CarAds.findOne({
            varification_code: code
        }, function (error, ad) {
            if (error) {
                console.log("error occured",error);
                return res.send(500).json({
                    message: "Internal Server Error",
                    status_code:500
                });
            }

            if (ad) {
                ad.is_mobile_varified = true;
                ad.save(function (err, ad) {
                   if(err){
                  
                    return res.status(200).json(
                        {message:"Could not update the Car Ad",
                        status_code:1
                    
                    }
                    
                    );
                   }
                   console.log("add is upated");
                   return res.status(200).json({
                       message:"Number is successfully varified",
                       status_code:1
                    
                    });
                });
            } else {
                console.log("could not find the ad");
                return res.status(200).json({
                    message: "Number could not be varified.Invalid code",
                    status_code:0
                });
            }
        });

    });

    return carAdRouter;
};

module.exports = routes;
