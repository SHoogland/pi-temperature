import * as fs from 'fs';
import axios from 'axios';

if(process.argv.length !== 6){
	console.log('Wrong command, use: "node index.mjs --experimental-modules [domain] [location] [sensor-address]"')
} else {
	let domain = process.argv[3]
	let location = process.argv[4]
	let sensorAddress = process.argv[5]
	
	fs.readFile(`/sys/bus/w1/devices/${sensorAddress}/w1_slave`, 'utf8', (err, data) => {
		if (err) throw err;
		let tempIndex = data.indexOf('t=')
		let temp = data.substring(tempIndex + 2, tempIndex + 7)
		temp = temp/1000
		console.log(temp)

		axios({
			method: 'post',
			url: `https://${domain}/pitemp`,
			data: {
				temp: temp,
				location: location
			}
		});

	});
}