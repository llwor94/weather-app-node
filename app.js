const request = require('request');
const yargs = require('yargs');

request(
	{
		url:
			'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBvvJ2RPSb2sua8pR-yXUf8sRO1BhlBjeE&address=1301%20lombard%20street%20philadelphia',
		json: true,
	},
	(error, response, body) => {
		console.log(`Address: ${body.results[0].formatted_address}`);
		console.log(`Lat: ${body.results[0].geometry.location.lat}`);
		console.log(`Long: ${body.results[0].geometry.location.lng}`);
	},
);
