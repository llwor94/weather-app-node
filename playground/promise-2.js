const request = require('request');

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		var encodedAddress = encodeURIComponent(address);

		request(
			{
				url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBvvJ2RPSb2sua8pR-yXUf8sRO1BhlBjeE&address=${encodedAddress}`,
				json: true,
			},
			(error, response, body) => {
				if (error) {
					reject('Unable to connect to Google servers.');
				} else if (body.status === 'ZERO_RESULTS') {
					reject('Unable to find address.');
				} else if (body.status === 'OK') {
					resolve({
						address: body.results[0].formatted_address,
						lat: body.results[0].geometry.location.lat,
						long: body.results[0].geometry.location.lng,
					});
				}
			},
		);
	});
};

geocodeAddress('19146').then(
	(location) => {
		console.log(JSON.stringify(location, undefined, 2));
	},
	(errorMessage) => {
		console.log(errorMessage);
	},
);
