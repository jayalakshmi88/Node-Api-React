var express=require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var morgan      = require('morgan');

// var jwt    = require('jsonwebtoken');

module.exports=function(){
    
    var app=express();


//app.set('superSecret', config.secret); 
     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

//   app.post('/',function(req,res){
//       console.log(req.body)
//        
//       res.end("<h1>Anil Kumar Yadav</h1>") 
//        
//    });
    
    var routes=require("../app/routes")
    routes(app)
    return app;
    
    
    
    
    
    
}