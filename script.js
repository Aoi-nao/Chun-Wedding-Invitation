/**
 * =========================================================
 * MAIN SCRIPT
 * Website Wedding Invitation
 * =========================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {

    checkConfiguration();

    applyTheme();

    renderOpening();

    renderHero();

    renderCouple();

    initCoupleAnimation();
    
    renderFamily();

    initializeCountdown();

    renderCeremony();

    initCeremonyAnimation();
    
    initializeMusicPlayer();

    initializeOpening();

}

function checkConfiguration() {

    if (typeof SiteConfig === 'undefined') {
        console.error('Không tìm thấy SiteConfig');
        return;
    }

    if (typeof ThemeConfig === 'undefined') {
        console.error('Không tìm thấy ThemeConfig');
        return;
    }

    if (typeof WeddingData === 'undefined') {
        console.error('Không tìm thấy WeddingData');
        return;
    }

    console.log('✓ Configuration Loaded');
}

function applyTheme() {

    const root = document.documentElement;

    root.style.setProperty('--color-primary', ThemeConfig.colors.primary);
    root.style.setProperty('--color-secondary', ThemeConfig.colors.secondary);
    root.style.setProperty('--color-accent', ThemeConfig.colors.accent);
    root.style.setProperty('--color-text', ThemeConfig.colors.text);
    root.style.setProperty('--color-white', ThemeConfig.colors.white);

}

/* ==========================================================
   OPENING
========================================================== */

function renderOpening() {

    const opening = document.querySelector("#opening");

    if (!opening) return;

    const background = opening.querySelector(".opening-background");
    const name = opening.querySelector(".opening-name");
    const date = opening.querySelector(".opening-date");
    const button = opening.querySelector(".opening-button");

    if (!background || !name || !date || !button) {
        console.error("Opening: thiếu phần tử HTML.");
        return;
    }

    background.style.backgroundImage =
        WeddingData.opening.background
            ? `url("${WeddingData.opening.background}")`
            : "none";

    name.innerHTML =
        `${WeddingData.groom.fullName}<br>&<br>${WeddingData.bride.fullName}`;

    date.textContent =
        `${WeddingData.wedding.day} • ${WeddingData.wedding.month} • ${WeddingData.wedding.year}`;

    button.textContent = WeddingData.opening.buttonText;
}

function initializeOpening() {

    const opening = document.querySelector("#opening");
    const button = document.querySelector("#openInvitation");

    if (!opening || !button) return;

    button.addEventListener("click", () => {

    const player = document.querySelector("#musicPlayer");

    if (player) {

    player.classList.add("show");

    player.classList.add("playing");

}

    opening.classList.add("opening-hide");

    setTimeout(() => {

        opening.remove();

    },800);

});

}


/* ==========================================================
   MUSIC PLAYER
========================================================== */

function initializeMusicPlayer() {

    const player = document.querySelector("#musicPlayer");
    const button = document.querySelector("#musicToggle");

    if (!player || !button) return;

    button.addEventListener("click", () => {

        const isPlaying = player.classList.toggle("playing");

        button.setAttribute(
            "aria-pressed",
            isPlaying ? "true" : "false"
        );

    });

}


/* ==========================================================
   HERO
========================================================== */

function renderHero() {

    const hero = document.querySelector("#hero");

    if (!hero) return;

    const monogram = hero.querySelector(".hero-monogram");
    const image = hero.querySelector(".hero-photo-image");
    const name = hero.querySelector(".hero-name");
    const date = hero.querySelector(".hero-date");
    const quote = hero.querySelector(".hero-quote");

    if (!monogram || !image || !name || !date || !quote) {
        console.error("Hero: thiếu phần tử HTML.");
        return;
    }

    // Ảnh Hero
    image.src = WeddingData.hero.image || "";
    image.alt = `${WeddingData.groom.fullName} & ${WeddingData.bride.fullName}`;

    // Monogram (tạm thời lấy từ data)
    monogram.textContent = WeddingData.wedding.monogram;

    // Tên
    name.innerHTML =
        `${WeddingData.groom.fullName}<br>&<br>${WeddingData.bride.fullName}`;

    // Ngày
    date.textContent =
        `${WeddingData.wedding.weekday} • ${WeddingData.wedding.day} • ${WeddingData.wedding.month} • ${WeddingData.wedding.year}`;

    // Quote
    quote.textContent = WeddingData.wedding.quote;

}



/* ==========================================================
   COUPLE
========================================================== */

function renderCouple() {

    const brideAvatar = document.getElementById("bride-avatar");
    const brideName = document.getElementById("bride-name");

    const groomAvatar = document.getElementById("groom-avatar");
    const groomName = document.getElementById("groom-name");

    if (!brideAvatar || !brideName || !groomAvatar || !groomName) {
        return;
    }

    brideAvatar.src = WeddingData.bride.avatar;
    brideName.textContent = WeddingData.bride.fullName;

    groomAvatar.src = WeddingData.groom.avatar;
    groomName.textContent = WeddingData.groom.fullName;
}

function renderFamily() {

    const brideFather = document.getElementById("bride-father");
    const brideMother = document.getElementById("bride-mother");

    const groomFather = document.getElementById("groom-father");
    const groomMother = document.getElementById("groom-mother");

    if (!brideFather || !brideMother || !groomFather || !groomMother) {
        return;
    }

    brideFather.textContent = WeddingData.bride.father;
    brideMother.textContent = WeddingData.bride.mother;

    groomFather.textContent = WeddingData.groom.father;
    groomMother.textContent = WeddingData.groom.mother;
}
function initCoupleAnimation() {

    const couple = document.getElementById("couple");

    if (!couple) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    couple.classList.add("is-visible");

                    observer.unobserve(couple);
                }

            });

        },
        {
            threshold: 0.18
        }
    );

    observer.observe(couple);
}

/* ==========================================================
   CEREMONY — RENDER WEDDING INFORMATION
========================================================== */

function renderCeremony() {

    const ceremonySection = document.getElementById("ceremony");

    if (!ceremonySection) {
        return;
    }

    const ceremonyData = WeddingData.ceremony;

    if (!ceremonyData) {
        return;
    }


    /* ======================================================
       HIỂN THỊ TEXT THEO DATA-CEREMONY
    ====================================================== */

    const ceremonyElements =
        ceremonySection.querySelectorAll("[data-ceremony]");

    ceremonyElements.forEach((element) => {

        const path =
            element.getAttribute("data-ceremony");

        const value =
            getCeremonyValue(ceremonyData, path);

        element.textContent =
            value || "";

    });


    /* ======================================================
       GOOGLE MAPS
    ====================================================== */

    const mapElements =
        ceremonySection.querySelectorAll("[data-ceremony-map]");

    mapElements.forEach((element) => {

        const path =
            element.getAttribute("data-ceremony-map");

        const value =
            getCeremonyValue(ceremonyData, path);

        if (value) {

            element.href = value;

            element.style.display = "inline-flex";

        } else {

            element.removeAttribute("href");

            element.style.display = "none";

        }

    });

}


/* ==========================================================
   CEREMONY — CARD REVEAL ANIMATION
========================================================== */

function initCeremonyAnimation() {

    const ceremonySection =
        document.getElementById("ceremony");

    if (!ceremonySection) {
        return;
    }

    const cards =
        ceremonySection.querySelectorAll(
            ".ceremony-ritual-card"
        );

    if (!cards.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.18
            }
        );

    cards.forEach((card) => {

        observer.observe(card);

    });

}

/* ==========================================================
   GET CEREMONY DATA
   Ví dụ:
   brideParty.address
   groomParty.map
========================================================== */

function getCeremonyValue(data, path) {

    if (!data || !path) {
        return "";
    }

    const parts =
        path.split(".");

    let current =
        data;

    for (const part of parts) {

        if (
            current === null ||
            current === undefined
        ) {
            return "";
        }

        current =
            current[part];

    }

    return current ?? "";
}



/* ==========================================================
   COUNTDOWN
========================================================== */

function initializeCountdown() {

    const countdownSection = document.getElementById("countdown");

    if (!countdownSection) {
        return;
    }

    const wedding = WeddingData.wedding;

    if (
        !wedding ||
        !wedding.year ||
        !wedding.month ||
        !wedding.day
    ) {
        return;
    }

    const targetDate = new Date(
        Number(wedding.year),
        Number(wedding.month) - 1,
        Number(wedding.day),
        0,
        0,
        0
    );

    const daysElement = document.getElementById("countdown-days");
    const hoursElement = document.getElementById("countdown-hours");
    const minutesElement = document.getElementById("countdown-minutes");
    const secondsElement = document.getElementById("countdown-seconds");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    function updateCountdown() {

        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;
        }

        const totalSeconds = Math.floor(
            difference / 1000
        );

        const days = Math.floor(
            totalSeconds / 86400
        );

        const hours = Math.floor(
            (totalSeconds % 86400) / 3600
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );

        const seconds =
            totalSeconds % 60;

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );
}
