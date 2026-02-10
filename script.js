// console.log("script loaded");
// console.log("open buttons:", document.querySelectorAll(".rsvp-open").length);

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

    // bdayText.textContent = target;
}


updateCountdown();
setInterval(updateCountdown, 1000);

const modal = document.getElementById("rsvpModal");

function openModal(opener) {
    if (!modal) return;

    lastOpener = opener || document.activeElement;
    
    modal.removeAttribute("inert")
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    const firstInput = modal.querySelector("input, select, textarea, button");
    if (firstInput) firstInput.focus();
}

function closeModal() {
    if (!modal) return;

    if (lastOpener && typeof lastOpener.focus === "function") {
        lastOpener.focus();
    }

    modal.setAttribute("inert", "");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".rsvp-open");
    if (!btn) return;
    openModal(btn);
});

modal?.addEventListener("click", (e) => {
    if (e.target.matches('[data-close="true"]')) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
});