let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let h, m, s, ms;
let flag_no = 1;

let timerRef = document.querySelector(".timer_display");
let int = null;

document.getElementById("start_timer").addEventListener("click", () => {
    if(int !== null){
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
    timerRef.style.color = "white";
});



function displayTimer(){
    milliseconds += 10;

    seconds = milliseconds == 1000 ? (seconds + 1) % 60 : seconds;

    minutes = seconds == 0 && milliseconds == 0 ? (minutes + 1) % 60 : minutes;

    hours = minutes == 0 && seconds == 0 && milliseconds == 0 ? (hours + 1) % 60 : hours;

    milliseconds = milliseconds == 1000 ? 0 : milliseconds;

    h = String(hours).padStart(2, "0");
    m = String(minutes).padStart(2, "0");
    s = String(seconds).padStart(2, "0");
    ms = String(milliseconds).padStart(3, "0");

    timerRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
} 

document.getElementById("pause_timer").addEventListener("click", () => {
    clearInterval(int);
    timerRef.style.color = "red";


    // adds a blinking effect
    let isHidden = false;
    const blinkInterval = setInterval(() => {
        timerRef.style.visibility = isHidden ? "hidden" : "visible";
        isHidden = !isHidden;
    }, 200); 

    
    setTimeout(() => {
        clearInterval(blinkInterval);
        timerRef.style.visibility = "visible";
    }, 3000);
});
document.getElementById("reset_timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];

    timerRef.innerHTML = "00 : 00 : 00 : 000";
    timerRef.style.color = "white";
    
    // Empty the lap list
    lapList.innerHTML = "";
    flag_no = 1;
});

const lapList = document.getElementById("lap_list");
document.getElementById("Btn").addEventListener("click", () => {
    if(int == null){
        alert("You must start!!")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = `${flag_no} : ${h} : ${m} : ${s} : ${ms}`;

        li.setAttribute("data-aos", "zoom-in-up");
        li.setAttribute("data-aos-duration", "300");

        lapList.appendChild(li);
        flag_no  = flag_no + 1;
    }

});