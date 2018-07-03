var mongoose= require('mongoose');

var schema = mongoose.Schema;
//defining data schema for extraction from MongoDB
var physicianDataSchema = new schema({
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
},{collection : 'physicianDataComplete'});//end of physicianDataSchema;

var physicianData = mongoose.model('physicianData',physicianDataSchema);



module.exports = {
    "MongoURL": 'mongodb://vamshi:Vam*7573@ds217351.mlab.com:17351/cmsphysicians',
    "physicianData":physicianData
};