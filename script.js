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

    initializeRSVP();

    /* ======================================================
       OPENING & MUSIC
       Khởi tạo trước Gallery để một lỗi ở Gallery
       không làm mất chức năng MỞ THIỆP.
    ====================================================== */

    initializeMusicPlayer();

    initializeOpening();


    /* ======================================================
       GALLERY
       Khởi tạo sau cùng.
    ====================================================== */

    renderGallery();

    initGalleryAnimation();

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

    root.style.setProperty('--color-primary',ThemeConfig.colors.primary);

    root.style.setProperty('--color-secondary',ThemeConfig.colors.secondary);

    root.style.setProperty('--color-accent',ThemeConfig.colors.accent);

    root.style.setProperty('--color-text',ThemeConfig.colors.text);

    root.style.setProperty('--color-white',ThemeConfig.colors.white);

    root.style.setProperty('--color-countdown',ThemeConfig.colors.countdown);

    root.style.setProperty('--color-gallery',ThemeConfig.colors.gallery);

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

        if (player && player.audio) {

            player.classList.add("show");

            player.audio.play()
                .then(() => {

                    player.classList.add("playing");

                    const musicButton =
                        document.querySelector("#musicToggle");

                    if (musicButton) {
                        musicButton.setAttribute(
                            "aria-pressed",
                            "true"
                        );
                    }

                })
                .catch((error) => {

                    console.warn(
                        "Không thể phát nhạc:",
                        error
                    );

                });

        }

        opening.classList.add("opening-hide");

        setTimeout(() => {

            opening.remove();

        }, 800);

    });

}


/* ==========================================================
   MUSIC PLAYER
========================================================== */

function initializeMusicPlayer() {

    const player = document.querySelector("#musicPlayer");
    const button = document.querySelector("#musicToggle");

    if (!player || !button) return;

    // Tạo audio từ dữ liệu WeddingData
    const audio = new Audio(WeddingData.music.src);

    audio.loop = WeddingData.music.loop ?? true;
    audio.preload = "auto";

    // Lưu audio vào player để có thể dùng lại nếu cần
    player.audio = audio;

    // Trạng thái Music Player
    function updatePlayerState(isPlaying) {

        player.classList.toggle("playing", isPlaying);

        button.setAttribute(
            "aria-pressed",
            isPlaying ? "true" : "false"
        );

    }

    // Nút bật / tắt nhạc
    button.addEventListener("click", () => {

        if (audio.paused) {

            audio.play()
                .then(() => {
                    updatePlayerState(true);
                })
                .catch((error) => {
                    console.warn("Không thể phát nhạc:", error);
                });

        } else {

            audio.pause();
            updatePlayerState(false);

        }

    });

    // Nếu nhạc kết thúc
    audio.addEventListener("ended", () => {
        updatePlayerState(false);
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
   GALLERY — RENDER & AUTO DETECT IMAGE RATIO
========================================================== */

function renderGallery() {

    const gallerySection =
        document.getElementById("gallery");

    const galleryGrid =
        document.getElementById("galleryGrid");

    if (!gallerySection || !galleryGrid) {
        return;
    }

    const galleryData =
        WeddingData.gallery;

    if (
        !Array.isArray(galleryData) ||
        galleryData.length === 0
    ) {
        return;
    }


    /* ======================================================
       CLEAR CURRENT GALLERY
    ====================================================== */

    galleryGrid.innerHTML = "";


    /* ======================================================
       CREATE IMAGE ITEMS
    ====================================================== */

    galleryData.forEach((imageSource, index) => {

        if (!imageSource) {
            return;
        }


        const item =
            document.createElement("div");

        item.className =
            "gallery-item";


        const image =
            document.createElement("img");

        image.src =
            imageSource;

        image.alt =
            `Khoảnh khắc ${index + 1}`;

        image.loading =
            index === 0
                ? "eager"
                : "lazy";

        image.decoding =
            "async";


        /* ==================================================
           AUTO DETECT IMAGE RATIO
        ================================================== */

        image.addEventListener(
            "load",
            () => {

                const width =
                    image.naturalWidth;

                const height =
                    image.naturalHeight;

                if (
                    !width ||
                    !height
                ) {
                    return;
                }


                const ratio =
                    width / height;


                /* ------------------------------------------
                   PORTRAIT
                ------------------------------------------ */

                if (ratio < 0.88) {

                    item.classList.add(
                        "is-vertical"
                    );

                }


                /* ------------------------------------------
                   LANDSCAPE
                ------------------------------------------ */

                else if (ratio > 1.12) {

                    item.classList.add(
                        "is-horizontal"
                    );

                }


                /* ------------------------------------------
                   SQUARE / NEAR SQUARE
                ------------------------------------------ */

                else {

                    item.classList.add(
                        "is-square"
                    );

                }

            }
        );


        item.appendChild(image);

        galleryGrid.appendChild(item);

    });

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


/* ==========================================================
   GALLERY — SOFT REVEAL TIMING
========================================================== */

function initGalleryAnimation() {

    const gallery =
        document.getElementById("gallery");

    if (!gallery) {
        return;
    }

    const items =
        gallery.querySelectorAll(".gallery-item");

    if (!items.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const item =
                        entry.target;

                    const index =
                        Number(
                            item.dataset.galleryIndex || 0
                        );

                    let delay = 0;


                    /*
                       NHỊP HIỆN ẢNH

                       Ảnh 1
                       ↓
                       Ảnh 2 + 3
                       ↓
                       Ảnh 4
                       ↓
                       Ảnh 5 + 6
                       ↓
                       ...

                       Chuyển tiếp chậm và tự nhiên.
                    */

                    if (index === 0) {

                        delay = 0;

                    } else {

                        const group =
                            Math.floor(
                                (index - 1) / 2
                            );

                        delay =
                            120 + group * 110;

                    }


                    setTimeout(() => {

                        item.classList.add(
                            "is-visible"
                        );

                    }, delay);


                    observer.unobserve(item);

                });

            },
            {
                threshold: 0.12
            }
        );


    items.forEach((item, index) => {

        item.dataset.galleryIndex =
            index;

        observer.observe(item);

    });

}


/* ==========================================================
   RSVP
========================================================== */

function initializeRSVP() {

    const form =
        document.getElementById("rsvpForm");

    const guests =
        document.getElementById("rsvpGuests");

    const guestCount =
        document.getElementById("rsvpGuestCount");

    const minusButton =
        document.getElementById("rsvpMinus");

    const plusButton =
        document.getElementById("rsvpPlus");

    const status =
        document.getElementById("rsvpStatus");


    if (
        !form ||
        !guests ||
        !guestCount ||
        !minusButton ||
        !plusButton ||
        !status
    ) {
        return;
    }


    /* ======================================================
       DEFAULT
    ====================================================== */

    let count = 1;

    guests.hidden = true;

    guestCount.textContent = count;


    /* ======================================================
       ATTENDANCE
    ====================================================== */

    const attendanceInputs =
        form.querySelectorAll(
            'input[name="attendance"]'
        );


    attendanceInputs.forEach((input) => {

        input.addEventListener(
            "change",
            () => {

                if (input.value === "yes") {

                    guests.hidden = false;

                } else if (input.value === "no") {

                    guests.hidden = true;

                }

            }
        );

    });


    /* ======================================================
       MINUS
    ====================================================== */

    minusButton.addEventListener(
        "click",
        () => {

            if (count > 1) {

                count--;

                guestCount.textContent =
                    count;

            }

        }
    );


    /* ======================================================
       PLUS
    ====================================================== */

    plusButton.addEventListener(
        "click",
        () => {

            if (count < 5) {

                count++;

                guestCount.textContent =
                    count;

            }

        }
    );


    /* ======================================================
   SUBMIT
====================================================== */

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const nameInput =
            form.querySelector(
                'input[name="name"]'
            );

        const attendanceInput =
            form.querySelector(
                'input[name="attendance"]:checked'
            );


        if (
            !nameInput ||
            !attendanceInput
        ) {
            return;
        }


        const name =
            nameInput.value.trim();

        const attendance =
            attendanceInput.value;


        if (!name) {
            return;
        }


        const formData =
            new URLSearchParams();


        formData.append(
            "name",
            name
        );


        formData.append(
            "attendance",
            attendance
        );


        formData.append(
            "guests",
            attendance === "yes"
                ? count
                : ""
        );


        status.classList.remove(
            "is-success",
            "is-error"
        );


        try {

            await fetch(
                RSVPConfig.endpoint,
                {
                    method: "POST",

                    mode: "no-cors",

                    body: formData
                }
            );


            /*
               Google Apps Script nhận dữ liệu
               nhưng trình duyệt không cho website
               đọc response vì CORS.

               Vì vậy không dùng response.json()
               ở đây.
            */

            status.textContent =
                "Cảm ơn bạn đã phản hồi ❤️";

            status.classList.add(
                "is-success"
            );


        } catch (error) {

            console.error(
                "RSVP error:",
                error
            );


            status.textContent =
                "Đã có lỗi xảy ra. Vui lòng thử lại.";

            status.classList.add(
                "is-error"
            )

        }

    }
);

}

/* ==========================================================
   GIFT & WISHES — DATA BINDING
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof GIFT_WISHES_DATA === "undefined") {
        console.warn("GIFT_WISHES_DATA is not available.");
        return;
    }

    const data = GIFT_WISHES_DATA;


    // =========================
    // GIFT
    // =========================

    document.getElementById("giftMessage").textContent =
        data.gift.message;

    document.getElementById("giftInvitation").textContent =
        data.gift.invitation;

    document.getElementById("giftOpenMessage").textContent =
        data.gift.openMessage;


    // =========================
    // WISHES
    // =========================

    document.getElementById("wishesTitle").textContent =
        data.wishes.title;

    document.getElementById("wishesDescription").textContent =
        data.wishes.description;

});

/* ==========================================================
   GIFT — OPEN / CLOSE QR
========================================================== */

const giftTrigger = document.getElementById("giftTrigger");
const giftDetails = document.getElementById("giftDetails");

if (giftTrigger && giftDetails) {

    giftTrigger.addEventListener("click", () => {

        const isOpen =
            giftTrigger.getAttribute("aria-expanded") === "true";

        if (isOpen) {

            giftDetails.classList.remove("is-visible");

            giftTrigger.setAttribute(
                "aria-expanded",
                "false"
            );

            setTimeout(() => {
                giftDetails.hidden = true;
            }, 450);

        } else {

            giftDetails.hidden = false;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {

                    giftDetails.classList.add(
                        "is-visible"
                    );

                });
            });

            giftTrigger.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

}
