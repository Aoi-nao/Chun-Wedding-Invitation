/**
 * =========================================================
 * THEME CONFIGURATION
 * Chỉ chứa cấu hình giao diện.
 * Không chứa dữ liệu cưới.
 * =========================================================
 */

const ThemeConfig = Object.freeze({

    colors: {
    primary: "#506B55",
    secondary: "#F3F5EF",
    accent: "#C7A45D",
    text: "#35443A",
    white: "#FFFFFF",
        
    countdown: "#596A55",
    gallery: "#74856F"
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
