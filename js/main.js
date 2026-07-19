"use strict";

/* =========================================
   HEADER SCROLL
========================================= */

const header = document.getElementById("header");

function changeHeaderOnScroll() {
    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("header--scrolled");
    } else {
        header.classList.remove("header--scrolled");
    }
}

window.addEventListener("scroll", changeHeaderOnScroll);

changeHeaderOnScroll();


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
    ".section-header, " +
    ".car-card, " +
    ".advantage-card, " +
    ".test-drive__content, " +
    ".test-drive__form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================
   COUNTER ANIMATION
========================================= */

const statNumbers = document.querySelectorAll(".hero__stat strong");

function getCounterData(text) {
    const number = parseInt(text.replace(/\D/g, ""), 10);

    let suffix = "";

    if (text.includes("+")) {
        suffix = "+";
    }

    if (text.includes("лет")) {
        suffix = " лет";
    }

    return {
        number,
        suffix
    };
}

function animateCounter(element) {
    const originalText = element.textContent.trim();
    const { number, suffix } = getCounterData(originalText);

    if (Number.isNaN(number)) return;

    let currentValue = 0;
    const duration = 1400;
    const frameRate = 16;
    const totalFrames = duration / frameRate;
    const increment = number / totalFrames;

    function updateCounter() {
        currentValue += increment;

        if (currentValue < number) {
            element.textContent =
                Math.floor(currentValue).toLocaleString("ru-RU") +
                suffix;

            requestAnimationFrame(updateCounter);
        } else {
            element.textContent =
                number.toLocaleString("ru-RU") +
                suffix;
        }
    }

    updateCounter();
}

const statsContainer = document.querySelector(".hero__stats");

if (statsContainer) {
    let countersStarted = false;

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting || countersStarted) return;

                countersStarted = true;

                statNumbers.forEach((numberElement) => {
                    animateCounter(numberElement);
                });

                counterObserver.disconnect();
            });
        },
        {
            threshold: 0.4
        }
    );

    counterObserver.observe(statsContainer);
}


/* =========================================
   HERO PARALLAX
========================================= */

const heroBackground = document.querySelector(".hero__background");

function heroParallax() {
    if (!heroBackground) return;

    const scrollPosition = window.scrollY;

    if (scrollPosition <= window.innerHeight) {
        heroBackground.style.transform =
            `scale(1.05) translateY(${scrollPosition * 0.08}px)`;
    }
}

window.addEventListener("scroll", heroParallax);


/* =========================================
   SMOOTH ANCHOR LINKS
========================================= */

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        if (link.id === "openTestDrive") return;

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (!targetElement) return;

        event.preventDefault();

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

/* =========================================
   SCROLL PROGRESS
========================================= */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);

updateScrollProgress();

const testDriveButton = document.getElementById("openTestDrive");
const testDriveSection = document.getElementById("test-drive");

if (testDriveButton && testDriveSection) {
    testDriveButton.addEventListener("click", (e) => {
        e.preventDefault();

        testDriveSection.classList.remove("test-drive--hidden");
        testDriveSection.classList.add("test-drive--show");

        testDriveSection.scrollIntoView({
            behavior: "smooth"
        });
    });
}

