"use strict";

const preloader = document.getElementById("preloader");

window.addEventListener("load", () => {
    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("preloader--hidden");
    }, 1700);

    setTimeout(() => {
        preloader.remove();
    }, 2500);
});