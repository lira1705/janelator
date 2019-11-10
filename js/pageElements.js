const loadSpinner = document.getElementById("loading");
const rainLogo = document.getElementById("rainLogo");
const luminosityLogo = document.getElementById("luminosityLogo")
const loadSpinnerClassList = loadSpinner.classList;

function displaySpinner(event) {
    event.stopPropagation();
    changeRainStatus();
    changeLuminosityStatus();
    if (loadSpinnerClassList.contains("hidden")) {
        loadSpinnerClassList.remove("hidden");
    } else {
        loadSpinnerClassList.add("hidden");
    }
    console.log(loadSpinnerClassList.contains("hidden"));
}

function changeRainStatus() {
    rainLogo.src = "./assets/raining.png"
}

function changeLuminosityStatus() {
    luminosityLogo.src = "./assets/cloudySun.png";
}