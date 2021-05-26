const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const getResult = require('./weatherApi');
const https = require('https');
//const getResult = require('./weatherApi');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

	res.render("index");
});

app.get("/weather", function(req, res){
 
	// var Patna, Delhi, Lucknow;
	// Patna = getResult("Patna")
	// console.log(Patna.temp);
	// Delhi = getResult(Delhi)
	// Lucknow = getResult(Lucknow)
	res.render("weather", {
		
	});
});

app.get('/about', function(req, res){
	res.render('about');
})
app.post("/weather",function(req,res){

	var city = req.body.cityName;
	console.log(city);

	// ----------------------------------
	const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=2702141464f7f26363a0df88ab12a5d1";
	https.get(url,function(response){
		console.log(response.statusCode);

		response.on("data",function(data){
			const weatherData = JSON.parse(data);
			var temp = weatherData.main.temp;
			var desc = weatherData.weather[0].description;
			// console.log(desc);
			// console.log(temp);
			var id = weatherData.weather[0].icon;
			const Wurl = "http://openweathermap.org/img/wn/" + id + "@2x.png";

			// app.get("/output", function(req, res){
			res.render('output', {
					city : city,
					description : desc,
					tempt : temp,
					imgsrc : Wurl
				});
			});
			// res.write("<p>The description of weather is :  " + desc + "</p>");
			// res.write("<h1>Temperature in "+ city +" is " + temp + " degree </h1>");
			// res.write("<img src=" + Wurl + ">");
			// res.send();
		// });
	});

	// -------------------------------
});

app.listen(3000,function(){
	console.log("Server is running on port 3000");
});

































