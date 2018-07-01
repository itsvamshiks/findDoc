var express = require('express');
var mongoose = require('mongoose');
var dbconf = require('../config_files/db_conf.js');
var axios = require('axios');
mongoose.connect(dbconf.MongoURL);
var router = express.Router();


function geocode(docaddress,callback){
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
            address: docaddress,
            key: 'AIzaSyA64HLONhPN-y2EDqdFYWlTX1fvQlis0xU'
        }
    }).then(function(response) {
        callback(response);
    }).catch(function(error){
       console.log(error)
    });

}
router.get('/',function(req,res) {
    var profile_id = req.query["physician_id"].split('-')[1];
    console.log(profile_id);
    res.set({
         'Content-Type': 'application/json',
         "Access-Control-Allow-Origin": '*'
     });
    dbconf.fetchData(profile_id,function (result) {
        console.log(result);
        var resAddress = result[0]['Recipient_Primary_Business_Street_Address_Line1']+","+result[0]['Recipient_Primary_Business_Street_Address_Line2']+","+result[0]['Recipient_City']+","+result[0]['Recipient_State']+","+ result[0]['Recipient_Zip_Code']+","+result[0]['Recipient_Country']
        resAddress = JSON.stringify(resAddress);
         geocode(resAddress,function(response) {

            var doc_latitude;//= JSON.stringify(response.data.results[0].geometry.location.lat);
            var doc_longitude;// = JSON.stringify(response.data.results[0].geometry.location.lng);
            var doc_name;// = JSON.stringify(result[0]['Physician_First_Name']+ " " + result[0]['Physician_Middle_Name']+" "+result[0]['Physician_Last_Name']);


           res.render('map',{doc_latitude: doc_latitude , doc_longitude: doc_longitude, doc_name: doc_name });
         })


    })


});

module.exports = router;
