const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};


// --- User Input --- //


hours.oninput = function() {
    var getNum = hours.value;
    alert(getNum);
};

minutes.oninput = function() {
    alert(hours.value);
};
seconds.oninput = function() {
alert(hours.value);
};




const TIME_LIMIT = 100000;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("timer").innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
    </div>
    `;


// --- Pause/Play update --- //

let controlPlay = document.getElementById("play");

controlPlay.addEventListener("click", pauseButton);
controlPlay.addEventListener("click", startTimer);


function pauseButton() {
    document.getElementById("pause").style.display = "block";
    document.getElementById("play").style.display = "none";
}

function onTimesUp() {
    clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft); 
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft <= 0) {
    onTimesUp();
    }
}, 1000);
}
  
function formatTime(time) { // time = 100,000
    const hours = Math.floor(time / 3600); // 27
    const minutes = Math.floor(time / 60); // 1666
    let seconds = time % 60; // 40
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }





    
    return `${hours}:${minutes}:${seconds}`;
  }

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
        document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
}


  

  
  
  

let controlPause = document.getElementById("pause");

controlPause.addEventListener("click", playButton);
controlPause.addEventListener("click", pauseTimer);

function playButton() {
    document.getElementById("play").style.display = "block";
    document.getElementById("pause").style.display = "none";
}

function pauseTimer() {
    alert('pause')
}




// --- Reset --- //
let reset = document.getElementById("reset");

reset.addEventListener("click", resetTime);

function resetTime() {
    alert('reset')
}
