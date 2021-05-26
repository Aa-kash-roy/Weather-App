
const https = require('https');
const getResult = (city) =>{

    const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=2702141464f7f26363a0df88ab12a5d1";
    console.log(url);
	https.get(url,function(response){
		// console.log(response.statusCode);

		response.on("data", function(data){

			const weatherData = JSON.parse(data);
            console.log(weatherData);
			const tempt = weatherData.main.temp;
			const desc = weatherData.weather[0].description;
			
			const id = weatherData.weather[0].icon;
			const Wurl = "http://openweathermap.org/img/wn/" + id + "@2x.png";
            console.log(tempt);
            console.log(desc);
            const obj = {tempt : tempt, desc : desc};
			return obj;
	})
    })
};

module.exports = getResult;


