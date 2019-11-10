var http = require("http");

http.createServer(function (req, res) {
    res.writeHeader(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*"
    });
    var interval = setInterval(function () {
        res.write("data: " + content() + "\n\n")
    }, 2000);
}).listen(9090);
console.log('SSE-Server started!');


const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', () => {
    console.log('Move connected')
    client.subscribe('janelator/room/+')
})
client.on('message', (topic, message) => {
    var windowPosition = message;
	console.log("topic %s, %s", topic, message);
	mqttresult = message;
    
})


var mqttresult;
function content(){
	return mqttresult;
}

function htmlDocument(descriptors, values) {
    size = descriptors.length;
    if (size != values.length) return "Error";
    result = "";
    for (let index = 0; index < size; index++) {
        result += lineFunction(descriptors[index], values[index]) + "-";
    }
    return result;
}

function lineFunction(descriptor, value) {
    return `${descriptor}=${value}`;
}
