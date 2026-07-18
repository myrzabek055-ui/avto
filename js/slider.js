const slider = document.getElementById("popularCars");
const prevButton = document.getElementById("sliderPrev");
const nextButton = document.getElementById("sliderNext");

if (slider && prevButton && nextButton) {

    const scrollAmount = 420;

    nextButton.addEventListener("click", () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    prevButton.addEventListener("click", () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });

}