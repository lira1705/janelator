
const mqtt = require('mqtt')
const op = require('rxjs/operators')
const Rx = require('rxjs/Rx')


const ultrasonicMQTT = mqtt.connect('mqtt://broker.hivemq.com')
const motorMQTT = mqtt.connect('mqtt://broker.hivemq.com')
const reactiveClient = mqtt.connect('mqtt://broker.hivemq.com')
const streamCient = mqtt.connect('mqtt://broker.hivemq.com')


const Gpio = require('pigpio').Gpio;

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;

const trigger = new Gpio(23, {mode: Gpio.OUTPUT});
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0); // Make sure trigger is low

const watchHCSR04 = () => {
  let startTick;

  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
		const endTick = tick;
		const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
		let distance = diff / 2 / MICROSECDONDS_PER_CM;
		//if(distance < 500) { 
			sendDistance(distance);
		//}
    }
  });
};

setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 500);


function sendDistance(value) {
  //console.log('Publishing distanceRAW: ' + value)
  ultrasonicMQTT.publish('janelator/room/distanceRAW', value.toString());
}








reactiveClient.on('connect', () => {
	reactiveClient.subscribe('janelator/room/distanceRAW')
	
})

let stream = Rx.Observable.fromEvent(reactiveClient, "message", (topic, message) => Number(message))

stream.pipe(
  op.filter(x => x < 500),
  op.scan((acc, curr) => {
        acc.push(curr);

        if (acc.length > 4) {
            acc.shift();
        }
        return acc;
    }, []),
  op.map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length)
).subscribe(x => streamCient.publish('janelator/room/distance', x.toString()))











watchHCSR04();


const motor = new Gpio(10, {mode: Gpio.OUTPUT});
let old_value = 0;

motorMQTT.on('connect', () => {
    console.log('Move connected')
    motorMQTT.subscribe('janelator/room/move')
})

motorMQTT.on('message', (topic, message) => {
    var windowPosition = Number(message);
    if (old_value == windowPosition) {
		return;
	}
	
	console.log("Was at %s, moving to %s", old_value, windowPosition);
	old_value = windowPosition;
    
    
    motor.servoWrite(Number(message));
    
})






