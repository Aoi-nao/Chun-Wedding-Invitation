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
    renderHero();
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
