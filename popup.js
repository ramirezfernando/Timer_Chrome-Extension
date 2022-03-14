// -- 
let time = document.getElementById("set_timer");

time.addEventListener("click", setTime);

let count = 1;

function setTime() {
    var userTimeInput = document.createElement("INPUT");
    userTimeInput.setAttribute("type", "text");
    userTimeInput.setAttribute("placeholder", "Enter Time");

    if (count == 1) {
        document.body.appendChild(userTimeInput);
    }
    count = 2;
}


// --- Pause/Play update --- //

let controlPlay = document.getElementById("play");

controlPlay.addEventListener("click", pauseButton);
controlPlay.addEventListener("click", startTimer);

function pauseButton() {
    document.getElementById("pause").style.display = "block";
    document.getElementById("play").style.display = "none";
}

function startTimer() {
    alert("starting")
}




let controlPause = document.getElementById("pause");

controlPause.addEventListener("click", playButton);
controlPause.addEventListener("click", pauseTimer);

function playButton() {
    document.getElementById("play").style.display = "block";
    document.getElementById("pause").style.display = "none";
}

function pauseTimer() {
    alert("pausing")
}

