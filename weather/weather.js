const request = require('request');

var getWeather = (lat, long, callback) => {
	request(
		{
			url: `https://api.darksky.net/forecast/9a3d59d0aa28de9b80d42982e4546243/${lat},%20${long}`,
			json: true,
		},
		(error, response, body) => {
			if (!error && response.statusCode === 200) {
				callback(undefined, {
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature,
				});
			} else {
				callback('Unable to fetch weather.');
			}
		},
	);
};

module.exports.getWeather = getWeather;
