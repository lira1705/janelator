/*
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', () => {
    console.log('connected')
    client.subscribe('janelator/room/move')
})

client.on('message', (topic, message) => {
    console.log('Received message from %s, and it says %s', topic, message)
    
})
*/

const Gpio = require('pigpio').Gpio;

const motor = new Gpio(10, {mode: Gpio.OUTPUT});

let pulseWidth = 1000;
let increment = 100;

setInterval(()=> {
	motor.servoWrite(pulseWidth);
	
	pulseWidth += increment; 
	console.log(pulseWidth);
	if(pulseWidth >= 2000){
		increment = -100;
    }
    else if(pulseWidth <= 1000) {
		increment = 100;
    }
}, 2000);
