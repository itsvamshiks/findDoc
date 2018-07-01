var dbconf = require('../config_files/db_conf.js')
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


router.get('/',function(req,res) {

   console.log("In the get request of Search Request")
   dbconf.fetchData(req,res,function (result) {
       console.log("In the callback of fetchData");
       var resData = JSON.stringify(result);
       res.render('results',{result_data:resData});


   })//end of fetchData callback;


})//end of router.get;


module.exports = router;
