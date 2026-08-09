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

    renderFamily();

    initCoupleAnimation();

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
