var express = require('express');
var mongoose = require('mongoose');
var axios = require('axios');
var dbconf = require('../config_files/db_config.js')
mongoose.connect(dbconf.MongoURL);
var router = express.Router();

function fetchData(prof_id, callback){
    dbconf.physicianData.find({'Physician_Profile_ID' : prof_id})
        .then(function (doc) {
            callback(doc);
        });

}

function geocode(docaddress,callback){
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
            address: docaddress,
            key: 'AIzaSyDi3wESzegDcUS8G0odNaK9tyevBhE2t5Q'
        }
    }).then(function(response) {
        callback(response);
    }).catch(function(error){
        console.log(error)
    });

}//end of geocode function


router.get('/',function(req,res) {
    var profile_id = req.query["physician_id"].split('-')[1];
    console.log(profile_id);

    fetchData(profile_id,function (result) {
        console.log(result);
        if(result[0]['Recipient_State']!=null) {
            var resAddress = result[0]['Recipient_Primary_Business_Street_Address_Line1'] + " " + result[0]['Recipient_Primary_Business_Street_Address_Line2'] + "," + result[0]['Recipient_City'] + "," + result[0]['Recipient_State'] + "," + result[0]['Recipient_Zip_Code'] + "," + result[0]['Recipient_Country']
        }else {
            var resAddress = result[0]['Recipient_Primary_Business_Street_Address_Line1'] + " " + result[0]['Recipient_Primary_Business_Street_Address_Line2'] + "," + result[0]['Recipient_City'] + "," + result[0]['Recipient_State'] + "," + result[0]['Recipient_Country']
        }

        resAddress = JSON.stringify(resAddress);
        var doc_name= result[0]['Physician_First_Name']+ " " + result[0]['Physician_Middle_Name']+" "+result[0]['Physician_Last_Name'];
        console.log("DOCNAME"+typeof(doc_name));
        geocode(resAddress,function(response) {

           res.render('map',{daddress:resAddress,dname:doc_name,dlatitude:response.data.results[0].geometry.location.lat, dlongitude: response.data.results[0].geometry.location.lng});

        })//end of geocode function callback


    })//end of fetchData function callback


});//end of router.get

module.exports = router;
