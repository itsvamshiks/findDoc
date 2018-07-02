var express = require('express');
var mongoose = require('mongoose');
var axios = require('axios');
mongoose.connect('mongodb://vamshi:Vam*7573@ds217351.mlab.com:17351/cmsphysicians');
var router = express.Router();
console.log("In Mapping Phase");

var schema = mongoose.Schema;

var physicianprofileSchema = new schema({
    Physician_Profile_ID :  Number,
    Physician_First_Name : String,
    Physician_Middle_Name : String,
    Physician_Last_Name : String,
    Physician_Name_Suffix : String,
    Recipient_Primary_Business_Street_Address_Line1 : String,
    Recipient_Primary_Business_Street_Address_Line2 : String,
    Recipient_City : String,
    Recipient_State : String,
    Recipient_Zip_Code : Number,
    Recipient_Country : String
},{collection : 'physicians'});

var physicianprofile = mongoose.model('physicianprofile',physicianprofileSchema);


function fetchData(prof_id, callback){
    physicianprofile.find({'Physician_Profile_ID' : prof_id})
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

}
router.get('/',function(req,res) {
    var profile_id = req.query["physician_id"].split('-')[1];
    console.log(profile_id);

    fetchData(profile_id,function (result) {
        console.log(result);
        var resAddress = result[0]['Recipient_Primary_Business_Street_Address_Line1']+","+result[0]['Recipient_Primary_Business_Street_Address_Line2']+","+result[0]['Recipient_City']+","+result[0]['Recipient_State']+","+ result[0]['Recipient_Zip_Code']+","+result[0]['Recipient_Country']
        resAddress = JSON.stringify(resAddress);
       geocode(resAddress,function(response) {
           var doc_name= result[0]['Physician_First_Name']+ " " + result[0]['Physician_Middle_Name']+" "+result[0]['Physician_Last_Name'];
           var jsonData = [{}];
           jsonData[0]['name'] = doc_name;
           jsonData[0]['lat'] = response.data.results[0].geometry.location.lat;
           jsonData[0]['long'] = response.data.results[0].geometry.location.lng;
           var jsonString = JSON.stringify(jsonData);
           res.render('map',{doctor:jsonString});

        })


    })


});

module.exports = router;
