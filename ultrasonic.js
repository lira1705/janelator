
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

client.on('message', () => {
  console.log('message')
})

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
      if(distance < 500) {
			sendData(distance);
			return;
	  }
	  console.log(distance);

    }
  });
};

setInterval(() => {
  trigger.trigger(20, 1); // Set trigger high for 10 microseconds
}, 1000);


function sendData(value) {
  console.log('publishing: ' + value)
  client.publish('janelator/room/distance', value.toString());
}

watchHCSR04();
