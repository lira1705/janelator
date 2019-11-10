const loadSpinner = document.getElementById("loading");
const rainLogo = document.getElementById("rainLogo");
const luminosityLogo = document.getElementById("luminosityLogo")
const loadSpinnerClassList = loadSpinner.classList;

var mqtt;
var reconnectTimeout = 2;
var host = "broker.hivemq.com";
var port = 8000;

var sslFlag = false;

function MQTTconnect() {
	console.log('connecting');
	mqtt = new Paho.MQTT.Client(host, port, "clientjs");
	
	var

var source = new EventSource("http://localhost:9090");
source.onmessage = function(event) {
	displaySpinner();
	console.log(event.data);
};

function changeWindow() {
	
    changeRainStatus();
    changeLuminosityStatus();
    if (loadSpinnerClassList.contains("hidden")) {
        loadSpinnerClassList.remove("hidden");
    } else {
        loadSpinnerClassList.add("hidden");
    }
}

function changeRainStatus() {
    rainLogo.src = "./assets/raining.png"
}

function changeLuminosityStatus() {
    luminosityLogo.src = "./assets/cloudySun.png";
}
