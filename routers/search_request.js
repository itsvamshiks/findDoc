var dbconf = require('../config_files/db_config.js')
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect(dbconf.MongoURL);
var router = express.Router();

//middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    console.log("finally In the schedule request clicked");
    next()
})//end of router.use;

function onFormSubmit(req,callback) {
    var validate = true;
    console.log("In the function call");

    var doc_fn = req.query['first_name'];
    var doc_mn = req.query['middle_name'];
    var doc_ln = req.query['last_name'];
    if(doc_fn == ""){
        validate = false;
        alert("First Name Required")
        location.href = "http://localhost:8080/findPhysicians"
    }
    if(validate = true) {
        callback(doc_fn,doc_mn,doc_ln);
    }
}

function fetchData(fn,mn,ln,callback){
    if(mn=="" && ln==""){
        dbconf.physicianData.find({'Physician_First_Name':fn})
            .then(function (doc) {
                callback(doc);
            })//end of then;

    }else if(mn==""){
        dbconf.physicianData.find({'Physician_First_Name':fn , 'Physician_Last_Name':ln})
            .then(function (doc) {
                callback(doc);
            })//end of then;
    }else if(ln==""){
        dbconf.physicianData.find({'Physician_First_Name':fn , 'Physician_Middle_Name':mn})
            .then(function (doc) {
                callback(doc);
            })//end of then;
    }else{
        dbconf.physicianData.find({'Physician_First_Name':fn , 'Physician_Middle_Name':mn,'Physician_Last_Name':ln})
            .then(function (doc) {
                callback(doc);
            })//end of then;
    }

}//end of fetchData



router.get('/',function(req,res) {

   console.log("In the get request of Search Request");
   onFormSubmit(req,function (firstName,middleName,lastName) {

       fetchData(firstName,middleName,lastName,function (result) {
           console.log("In the callback of fetchData");
           var resData = JSON.stringify(result);
           console.log(resData);
           res.render('results',{result_data:resData});


       })//end of fetchData callback;


   })//end of onFormSubmit callback


})//end of router.get;


module.exports = router;
