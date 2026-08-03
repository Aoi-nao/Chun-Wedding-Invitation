/**
 * =========================================================
 * THEME CONFIGURATION
 * Chỉ chứa cấu hình giao diện.
 * Không chứa dữ liệu cưới.
 * =========================================================
 */

const ThemeConfig = Object.freeze({

    colors: {
        primary: "#6D8C6B",
        secondary: "#F6F4EE",
        accent: "#D8BE84",
        text: "#4A4A4A",
        white: "#FFFFFF"
    },

    borderRadius: {
        small: 12,
        medium: 20,
        large: 32
    },

    animation: {
        duration: 600,
        easing: "ease"
    },

    opening: {
        enableFadeOut: true
    },

    hero: {
        mode: "photo", // "photo" | "floral"
        enablePetals: true
    },

    music: {
        autoplay: true,
        showControl: true
    },

    gallery: {
        layout: "masonry", // "masonry" | "grid" | "slider"
        lazyLoad: true
    }

});
