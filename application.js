var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var flash    = require('connect-flash');
var cors = require('cors');
var app = express();
var search_req = require('./routers/search_request.js');
var map_Physician = require('./routers/map_physician.js');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
var application = app.listen(process.env.PORT || 8080, function () {
    var host = application.address().address
    var port = application.address().port
    console.log("Visit findPhysicians application at http://%s:%s", host, port);
});
app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/findDoc/search',search_req);
app.use('/findDoc/map',map_Physician);
app.get("/findDoc",function(req,res){
    res.render('front',{});
});

