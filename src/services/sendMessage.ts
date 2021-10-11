const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org');


const Mqtt = (message:object) => {

	return new Promise<void>((resolve:any, reject:any) => {
		client.on('connect', function () {
			console.log('Connected Mqtt mosquitto');
	
			client.subscribe('lyatest/yudex', function (err) {
			  if (!err) {
				client.publish('lyatest/yudex', JSON.stringify(message))
			  } else{
				  reject(err)
			  }
			  
			})
		  })
		  
		  client.on('message', function (topic:any, message:string) {
			// Imprimir mensajes
			console.log(message.toString())
			client.end()
			resolve(message.toString())
			
		})
	})
	
	
	  
}

module.exports = Mqtt;

