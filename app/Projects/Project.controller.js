var Project = {};
var projectSchema = require("mongoose").model("ProjectList");

// var config=require("../../config/config");

// var jwt = require('jsonwebtoken');

// var token = require('../Register/Register.controller');

Project.create = function (req, res) {

    let project = new projectSchema(req.body);
    project.save()
        .then(function (response) {
            // console.log("save")
            var out = {
                msg: "Success",
                response: response
            }
            res.json(out);
        })
        .catch(function (err) {
            // console.log(err);
            var out = {
                msg: "Error",
                response: err
            }
            res.json(out);
        })
}

Project.update = function (req, res) {
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

    // if(a.status){

    var updateData = {
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Address: req.body.Address,
        City: req.body.City,
        State: req.body.State,
        ZipCode: req.body.ZipCode,
        ProjectName: req.body.ProjectName,
        OrganizationName: req.body.OrganizationName,
        PropertyAddress: req.body.PropertyAddress,
        MetroArea: req.body.MetroArea,
        ConstructionType: req.body.ConstructionType,
        PurchasePrice: req.body.PurchasePrice,
        SquareFootage: req.body.SquareFootage,
        RenovationLevel: req.body.RenovationLevel,
        Studios: req.body.Studios,
        One_BedRoom_11: req.body.One_BedRoom_11,
        Two_BedRoom_12: req.body.Two_BedRoom_12,
        Three_BedRoom_13: req.body.Three_BedRoom_13,
        Four_BedRoom_14: req.body.Four_BedRoom_14


    }
    projectSchema.update({ '_id': req.body.id },
        { $set: updateData }, function (err, result) {

            if (!err) {

                var msg="";
                if (result.nModified == 0) {
                    msg='Project data not modified';

                }
                else {
                    msg='Project updated successfully';

                }
                var out = {
                    msg:msg,
                    response: result,

                    // tokenStatus:a,
                    // token:token
                }
                res.json(out);


            }
            else {
                var out = {
                    msg: 'Project updation failed - id did not match'
                }
                res.json(out);


            }


        });

}
//     // else {
//     //     res.json(a);
//     // }


// }


Project.delete = function (req, res) {
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

    // if(a.status)
    // {

    projectSchema.deleteOne({ _id: req.body.id }, function (err, result) {

        if (!err) {
            var out = {
                msg: 'Project Removed Successfully',
                response: result,
                // tokenStatus:a,
                // token:token
            }
            res.json(out);

        }

        else {
            var out = {
                msg: 'Unable to delete like did not matched id',
            }
            res.json(out);


        }
    });
}
//             else
//             {
//                  res.json(a);
//             }



// }

Project.findProjects = function (req, res) {

    //console.log("hi"+req.params.id)

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

    //   if(a.status)
    //     {

    projectSchema.find({}, function (err, result) {

        if (!err) {
            var out = {
                msg: 'Found all projects Successfully',
                App: result,
                // tokenStatus:a,
                // token:token
            }
            res.json(out);
        }
        else {
            var out = {
                msg: 'Unable to find projects',
            }
            res.json(out);


        }



    });
}

//         else{

//             res.json(a);


//         }

// }



module.exports = Project;