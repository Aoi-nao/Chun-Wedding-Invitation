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
