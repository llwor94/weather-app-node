const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true,
		},
	})
	.help()
	.alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBvvJ2RPSb2sua8pR-yXUf8sRO1BhlBjeE&address=${encodedAddress}`;

axios
	.get(geocodeUrl)
	.then((response) => {
		if (response.data.status === 'ZERO_RESULTS') {
			throw new Error('Unable to find address.');
		}
		let lat = response.data.results[0].geometry.location.lat;
		let long = response.data.results[0].geometry.location.lng;
		var weatherUrl = `https://api.darksky.net/forecast/9a3d59d0aa28de9b80d42982e4546243/${lat},%20${long}`;
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherUrl);
	})
	.then((response) => {
		let temperature = response.data.currently.temperature;
		let apparentTemperature = response.data.currently.apparentTemperature;
		console.log(`It's current ${temperature}. It feels like ${apparentTemperature}`);
	})
	.catch((e) => {
		if (e.code === 'ENOTFOUND') {
			console.log('unable to connect to servers.');
		} else {
			console.log(e.message);
		}
	});
