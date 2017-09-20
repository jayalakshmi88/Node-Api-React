var Admin = {};

var AdminSchema = require("mongoose").model("Adminprofile");
var rcAssumptionSchema = require("mongoose").model("rcaprofiles");
var medianIncomeSchema = require("mongoose").model("mdnincmprofiles");
var fmrRentsSchema = require("mongoose").model("fmrrentsprofiles");

// var config=require("../../config/config");
// var token = require('../Register/Register.controller');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    // bcrypt = require('bcrypt'),
    // SALT_WORK_FACTOR = 10;
// var jwt = require('jsonwebtoken');


Admin.register = function (req, res) {

    
    console.log("TEST:",req.body);

        AdminSchema.findOne({
            $or: [{
                username: req.body.username
            },{
                email: req.body.email
            }]
            }, function(err, obj) {
                if (!err) {
                    if (obj == null) {
                        req.body.active = true;
                        req.body.removeAccount = true;
                        req.body.city = "NA";
                        req.body.address = "NA";
                        req.body.phone = "NA";
                        let profile = new AdminSchema(req.body);
        
                        profile.save()
                            .then(function (response) {
                            console.log("save")

                        var out = {
                            msg: "success",
                            response:response
                        }

                        res.json(out);
                    })
                    .catch(function (err) {

                        console.log(err);
                        var out = {
                            msg: "Error in save",
                            response: err
                        }
                        res.json(out);
                    })                  
                } 
                
             
            else {
                if(obj.email == req.body.email && obj.username == req.body.username) {
                    var out ={
                        msg : "Username & Email already registered for admin"
                    }
                    res.json(out);
                } else if (obj.email == req.body.email) {
                    var out = {
                        msg: 'Email already existed',
                    }
                    res.json(out);


                } else if (obj.username == req.body.username) {
                    var out = {
                        msg: 'Username already existed',
                    }
                    res.json(out);

                }

            }

        }
        else 
            {
                res.json(err);
                console.log('err' +err);
            }
    })
 }


Admin.update = function (req, res) 

{
    // var token = req.body.token;
    // //console.log(token);
    // var a={};

    // jwt.verify(token, config.secret, function(err, decoded) {      
    //     if (!err) {
    //         console.log("access") 
    //         console.log(decoded)
    //         a=decoded
    //         a.status=true;
          
    //     } else {
  
    //          a={err:err, success: false, message: 'Failed to authenticate token.',status:false }
    //     }
    //   });
    console.log(req.body)

    let updateData = {
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone

    }

    // if(a.status)
    // {
        AdminSchema.update({
            '_id': req.body.id
        }, {
            $set: updateData
        }, function (err, result) {
    
            if (!err) {
                
                {
                      var out = {
                            msg: 'Admin data updated successfully',
                            response: result, 
                            // tokenStatus:a,
                            // token:token
                        }
                       res.json(out);
                }
                
            } else {
            
                var out = {
                    msg: 'Admin updation failed - id did not match'
                }
                res.json(out);
    
            }
    
    
    
        });
    }
//     else{
//         res.json(a);
//     }
   

// }


Admin.medianIncome = function(req, res){

    medianIncomeSchema.find({}, function(err, result){
        
                if(err) {
        
                    console.log(err);
                    res.json(err)
        
                }
                else {
        
                    console.log(result);
                    var output = {
                        msg: "Found data successfully",
                        App: result
                    }
                    res.json(output)
                }
        
            });
    // let data = { 
         
    //     "Area_Name" : "Montgomery, AL ", 
    //     "Median_Income_2017 " : 59700, 
    //     "Person_1" : 25080, 
    //     "Person_2" : 28680, 
    //     "Person_3" : 32280, 
    //     "Person_4" : 35820, 
    //     "Person_5" : 38700, 
    //     "Person_6" : 41580, 
    //     "Person_7" : 44460, 
    //     "Person_8" : 47340
    // }

    // let medianIncomeData = new medianIncomeSchema(data);

    // medianIncomeData.save(function(err, results){

    //     if(!err){
    //         console.log(results)
    //         res.json(results);
    //     }
    //     else {
    //         console.log(err)
    //         res.json(err)
    //     }
    // })

    
}

Admin.updateMedianIncome = function(req, res)

{

    //  console.log(req.body)

  let updateData = {
         Area_Name: req.body.Area_Name,
         Median_Income_2017: req.body.Median_Income_2017,
         Person_1: req.body.Person_1,
         People_2: req.body.People_2,
         People_3: req.body.People_3,
         People_4: req.body.People_4,
         People_5: req.body.People_5,
         People_6: req.body.People_6,
         People_7: req.body.People_7,
         People_8: req.body.People_8

    }


    medianIncomeSchema.update({
        '_id': req.body.id
    }, {
        $set: updateData
    }, function (err, result) {
        
                 if (!err) {
                    
                          var output = {
                              msg: "Median Income data updated successfully",
                              response: result, 
                                // token:token
                            }
                            res.json(output)
                    
                        }
                        
                        else {
                            var output = {
                                // Error: err,
                                msg: 'MedianIncome data updation failed - id did not match'
                          }
                            res.json(output);
               
                       }               
        
            });

 }

Admin.deleteMedianIncome = function(req, res) {

    

    medianIncomeSchema.deleteOne({_id: req.body.id}, function(err, result){
        
        if(!err)
            {
                var out = {
                    msg: 'Data Removed Successfully',
                    response: result,
                    // tokenStatus:a,
                    // token:token
                }
                res.json(out);

            }   
           
        else
            {
                var out = {
                    msg: 'Unable to delete data - did not match id',
                }
                res.json(out);
               
                
            }
    });
}

Admin.addMedianIncomeData = function(req, res) {

    console.log(req.body)
    
            let data = new medianIncomeSchema(req.body);
                data.save()
                    .then(function(response) {
                        console.log("save")
                            var out={
                             msg:"Success",
                                response: response
                            }
                            res.json(out);
                    })
                    .catch(function(err) {
                        console.log(err);
                            var out={
                            msg:"Error",
                            response: err
                            }
                        res.json(out);
                    })
}

Admin.fmrRents = function(req, res){

    // let data = {
        
    //         "Area_Name" : "Aleutians East Borough, AK", 
    //         "Median_Income_2017" : 1630, 
    //         "Person_1" : 823.5, 
    //         "Person_2" : 942, 
    //         "Person_3" : 1059, 
    //         "Person_4" : 1176, 
    //         "Person_5" : 1270.5, 
    //         "Person_6" : 1365, 
    //         "Person_7" : 1459.5, 
    //         "Person_8" : 1552.5, 
    //         "State" : "AK", 
    //         "Cap_Rate" : 0.07, 
    //         "Class_C_Adjusted_Cap_Rate" : 0.11
        
    // }

    // let fmrRentsData = new fmrRentsSchema(data);
    
    // fmrRentsData.save(function(err, results){
    
    //         if(!err){
    //             console.log(results)
    //             res.json(results);
    //         }
    //         else {
    //             console.log(err)
    //             res.json(err)
    //         }
    //     })

        fmrRentsSchema.find({}, function(err, result){
            
                    if(err) {
            
                        console.log(err);
                        res.json(err)
            
                    }
                    else {
            
                        console.log(result);
                        res.json(result)
                    }
            
                });
}

Admin.addfmrRents = function(req, res) {

    let data = new fmrRentsSchema(req.body);
    data.save()
        .then(function(response) {
            console.log("save")
                var out={
                 msg:"Success",
                    response: response
                }
                res.json(out);
        })
        .catch(function(err) {
            console.log(err);
                var out={
                msg:"Error",
                response: err
                }
            res.json(out);
        })

}

Admin.updatefmrRents = function(req, res) {

    let updateData = {
        
        Area_Name: req.body.Area_Name,
        Median_Income_2017: req.body.Median_Income_2017,
        Person_1: req.body.Person_1,
        People_2: req.body.People_2,
        People_3: req.body.People_3,
        People_4: req.body.People_4,
        People_5: req.body.People_5,
        People_6: req.body.People_6,
        People_7: req.body.People_7,
        People_8: req.body.People_8,
        State   : req.body.State, 
        
    }

    fmrRentsSchema.update({
        '_id': req.body.id
    }, {
        $set: updateData
    }, function (err, result) {
        
                 if (!err) {
                    
                          var output = {
                              msg: "FMR Rents data updated successfully",
                              response: result, 
                                // token:token
                            }
                            res.json(output)
                    
                        }
                        
                        else {
                            var output = {
                                // Error: err,
                                msg: 'FMR Rents data updation failed - id did not match'
                          }
                            res.json(output);
               
                       }               
        
            });
}


Admin.deletefmrRents = function(req, res) {


    fmrRentsSchema.deleteOne({_id: req.body.id}, function(err, result){
        
        if(!err)
            {
                var out = {
                    msg: 'Data Removed Successfully',
                    response: result,
                    // tokenStatus:a,
                    // token:token
                }
                res.json(out);

            }   
           
        else
            {
                var out = {
                    msg: 'Unable to delete data - did not match id',
                }
                res.json(out);
               
                
            }
    });
}

Admin.rcAssumption = function(req, res){
//     let temp= { 
       
//          "type" : "Window_Estimate", 
//          "Window_Estimate" :70, 
//          "Repair_Level" : "Moderate", 
//          "price" : 100.0
//      }
 
 
//  let rcAssumptionData=new rcAssumptionSchema(temp);
 
 // rcAssumptionData.save(function(err,results){
 
 // if(!err)
 
 // {
 
 //     console.log("rc data save")
     
 //     console.log(results)
 
 //     res.json(results)
 
 // }
 // else{
 
 //     console.log("err")
 
 //     console.log(err)
 //     res.json(err)
     
 
 // }
 
 
 // })
 
 
     rcAssumptionSchema.find({}, function(err, obj){
 
         if(err) {
 
             console.log(err);
             res.json(err)
 
         } 
         else{
 
             console.log(obj)
             res.json(obj)
         }
 
     });
 }

 Admin.addRCAData = function(req, res) {

    let data = new rcAssumptionSchema(req.body);
    data.save()
        .then(function(response) {
            console.log("save")
                var out={
                 msg:"Success",
                    response: response
                }
                res.json(out);
        })
        .catch(function(err) {
            console.log(err);
                var out={
                msg:"Error",
                response: err
                }
            res.json(out);
        })

 }

 Admin.updateRCAData = function(req, res) {

    let updateData = {
        
        type: req.body.type,
        value: req.body.value,
        Repair_Level: req.body.Repair_Level,
        price: req.body.price        
    }

    rcAssumptionSchema.update({
        '_id': req.body.id
    }, {
        $set: updateData
    }, function (err, result) {
        
                 if (!err) {
                    
                          var output = {
                              msg: "RC Assumptions data updated successfully",
                              response: result, 
                                // token:token
                            }
                            res.json(output)
                    
                        }
                        
                        else {
                            var output = {
                                // Error: err,
                                msg: 'RC Assumptions data updation failed - id did not match'
                          }
                            res.json(output);
               
                       }               
        
            });
 }

 Admin.deleteRCAData = function(req, res) {

    rcAssumptionSchema.deleteOne({_id: req.body.id}, function(err, result){
        
        if(!err)
            {
                var out = {
                    msg: 'Data Removed Successfully',
                    response: result,
                    // tokenStatus:a,
                    // token:token
                }
                res.json(out);

            }   
           
        else
            {
                var out = {
                    msg: 'Unable to delete data - did not match id',
                }
                res.json(out);
               
                
            }
    });
 }


module.exports = Admin;