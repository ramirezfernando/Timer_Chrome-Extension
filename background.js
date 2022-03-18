chrome.runtime.onInstalled.addListener(() => {
    // --- User Input --- //

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }
// Setting filters for hours, minutes, seconds
setInputFilter(document.getElementById("hours"), function(value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 59); });
setInputFilter(document.getElementById("minutes"), function(value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 59); });
setInputFilter(document.getElementById("seconds"), function(value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 59); });

// Onsubmit 
let onSubmit = document.getElementById("submit");
onSubmit.addEventListener('click', setUserTime);


function setUserTime() {


    let hours = document.getElementById("hours");
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");

    hours = parseInt(hours.value);
    minutes = parseInt(minutes.value);
    seconds = parseInt(seconds.value);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert("Enter valid input");
        document.getElementById("play").disabled = true;
    }
    else {
        document.getElementById("play").disabled = false;

        let test = (hours * 3600) + (minutes * 60) + (seconds % 60);
        alert(test);
        
        if (hours < 10) {
            hours = `0${hours}`;
        }
        
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        
        document.getElementById("base-timer-label").innerHTML = `${hours}:${minutes}:${seconds}`;
    }
}





// -- Once Time is inputed
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

let TIME_LIMIT = 3661;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let defaultTime = `00:00:00`;
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
    <span id="base-timer-label" class="base-timer__label">${defaultTime}</span>
    </div>
    `; // formatTime(timeLeft)


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
    let hours = document.getElementById("hours");
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");

    hours = parseInt(hours.value);
    minutes = parseInt(minutes.value);
    seconds = parseInt(seconds.value);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert("Enter valid input");
    }
    else {
        TIME_LIMIT = (hours * 3600) + (minutes * 60) + (seconds % 60);
        //alert(timeLeft);
        //document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft); 



        
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
//1000
}
  
function formatTime(time) { 
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60) % 60; 
    let seconds = (time % 60); // 1

    //return `${hours}:${minutes}:${seconds}`;

    
    // Timer formatting
    if (hours > 0) {
        if (hours < 10) {
            hours = `0${hours}`;
            }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${hours}:${minutes}:${seconds}`;
    }
    if (hours == 0 && minutes > 0) {
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }
    if (hours == 0 && minutes == 0 && seconds > 0) {
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `00:${seconds}`;
    }
    if (hours == 0 && minutes == 0 && seconds == 0) {
        return `00:0${seconds}`; 
    }
    
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
  });