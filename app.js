'use strict';

//require ( 'dotenv' ).config ( {silent: true} );
var path = require('path');
var express = require ( 'express' );
var compression = require ( 'compression' );
var bodyParser = require ( 'body-parser' );
var basicAuth = require ( 'basic-auth-connect' );
var cors = require ( 'cors' );
var fb = require ('fbgraph');
var ejs= require('ejs');
var app = express ();
var ageRiskFactor= require('./jsons/age_risk_table.json')
var insure = require('./jsons/insurance_policies.json')
app.use ( compression () );
app.use ( bodyParser.json () );
app.use(bodyParser.urlencoded({ extended: true }));
app.use ( cors() );
app.use ( express.static ( __dirname + "/views" ) );
app.use ( express.static ( __dirname + "/bower_components" ) );
app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/getProfileInfo', function(req, res) {
	//console.log("abc")
	fb.setVersion("2.11");

	var token=req.query.token;
	//if(token==""){
		//var token="EAACEdEose0cBAFf9xsdXaxHT9j6OKzb8Lyzr14Wso7d78Rn8oeExNnZBJkUvWcyGzZBxEGXNCUoPHmUHSzUI2nPzxJe7DtokSSfhSUuyOLlr5BUfcttZA0soHZCKZABhrrxXsrdPVn57AiBU2IhnmxHJadKsHcNOdcaenV4ZBj4kz9jx30ZB96Nga54yge3WQTavaEhZAQltwQZDZD";
		//var token="EAAYWeaWcBv0BAA04UoE20ymYVxca79RalMPMr8OoieTpqXDFLIENAiPbjJUZAZBv1yaZBfmtds6yFuXxcI5BVDErc4J9dbDTEYC6UO8zZBSgj5mmXPLAOOSKekWF3v2SsGwzWqZAtU6tRK7rW7YBYmsZCEvZAbxa17LyZBIJXA4UYzDwk3oRqNTI9Cw8mZCiafSt8afI0ebaUWAZDZD"
	//}
	fb.setAccessToken(token);
	fb.get("me?fields=id,name,email,about,address,birthday,relationship_status,events", function(err,fres){
		//console.log(fres);
		res.json(fres);
	});
	//res
	//res.render('login');
});

app.get('/', function(req, res) {
	res.render("landing", {v:ageRiskFactor, t:insure});
})

module.exports = app;