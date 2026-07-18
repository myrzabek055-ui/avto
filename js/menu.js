"use strict";

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");
const navigationLinks = document.querySelectorAll(".header__link");

function closeMobileMenu() {
    if (!menuButton || !navigation) return;

    menuButton.classList.remove("menu-button--active");
    navigation.classList.remove("header__nav--active");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
}

function openMobileMenu() {
    if (!menuButton || !navigation) return;

    menuButton.classList.add("menu-button--active");
    navigation.classList.add("header__nav--active");
    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
}

if (menuButton && navigation) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {
        const isMenuOpen = navigation.classList.contains(
            "header__nav--active"
        );

        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    navigationLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMobileMenu();
        }
    });
}