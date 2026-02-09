const daysText = document.getElementById("days");
const hoursText = document.getElementById("hours");
const minutesText = document.getElementById("minutes");
const secondsText = document.getElementById("seconds");

const bdayText = document.getElementById("bday");

const bMonth = 2; // months are zero indexed wtf
const bDay = 1; // days are 1 indexed this fucking language

function getNextBDate() {
    const now = new Date();

    let target = new Date(now.getFullYear(), bMonth, bDay, 0, 0, 0);

    if (target <= now) {
        target = new Date(now.getFullYear() + 1, bMonth, bDay, 0, 0, 0);
    }

    return target;
}

function pad2(n) {
    return String(n).padStart(2, "0");
}

function updateCountdown() {
    const now = new Date();
    const target = getNextBDate();

    const diff = target - now;

    if (diff <= 0) {
        daysText.textContent = "0";
        hoursText.textContent = "00";
        minutesText.textContent = "00";
        secondsText.textContent = "00";
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    // seconds divided by seconds in a day
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    // remaining seconds divided by seconds in an hour
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    daysText.textContent = String(days);
    hoursText.textContent = pad2(hours);
    minutesText.textContent = pad2(minutes);
    secondsText.textContent = pad2(seconds);

    bdayText.textContent = target;
}


updateCountdown();
setInterval(updateCountdown, 1000);