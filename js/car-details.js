"use strict";

const detailsLoading = document.getElementById("detailsLoading");
const detailsContent = document.getElementById("detailsContent");

const mainCarImage = document.getElementById("mainCarImage");

const detailsBadge = document.getElementById("detailsBadge");
const detailsBrand = document.getElementById("detailsBrand");
const detailsTitle = document.getElementById("detailsTitle");
const detailsYear = document.getElementById("detailsYear");
const detailsPrice = document.getElementById("detailsPrice");
const detailsEngine = document.getElementById("detailsEngine");
const detailsPower = document.getElementById("detailsPower");
const detailsTransmission =
    document.getElementById("detailsTransmission");
const detailsFuel = document.getElementById("detailsFuel");

const specBrand = document.getElementById("specBrand");
const specModel = document.getElementById("specModel");
const specYear = document.getElementById("specYear");
const specCategory = document.getElementById("specCategory");
const specEngine = document.getElementById("specEngine");
const specPower = document.getElementById("specPower");
const specTransmission =
    document.getElementById("specTransmission");
const specFuel = document.getElementById("specFuel");

function getCarIdFromUrl() {
    const params = new URLSearchParams(window.location.search);

    return params.get("id");
}

async function loadCarDetails() {
    try {
        const carId = getCarIdFromUrl();

        if (!carId) {
            throw new Error("ID автомобиля не найден");
        }

        const response = await fetch("../data/cars.json");

        if (!response.ok) {
            throw new Error("Не удалось загрузить cars.json");
        }

        const cars = await response.json();

        const currentCar = cars.find((car) => {
            return String(car.id) === String(carId);
        });

        if (!currentCar) {
            throw new Error("Автомобиль не найден");
        }

        renderCarDetails(currentCar);

        if (detailsLoading) {
            detailsLoading.hidden = true;
        }

        if (detailsError) {
            detailsError.hidden = true;
        }

        if (detailsContent) {
            detailsContent.hidden = false;
        }
    } catch (error) {
        console.error(error);

        if (detailsLoading) {
            detailsLoading.hidden = true;
        }

        if (detailsContent) {
            detailsContent.hidden = false;
        }
    }
}

function renderCarDetails(car) {
    document.title =
        `${car.brand} ${car.model} — Velocity Auto`;

    setText(detailsBrand, car.brand);
    setText(detailsTitle, car.model);
    setText(detailsYear, car.year);
    setText(detailsBadge, car.badge);

    setText(
        detailsPrice,
        `$${formatPrice(car.price)}`
    );

    setText(detailsEngine, car.engine);
    setText(detailsPower, car.power);
    setText(detailsTransmission, car.transmission);
    setText(detailsFuel, car.fuel);

    setText(specBrand, car.brand);
    setText(specModel, car.model);
    setText(specYear, car.year);
    setText(specCategory, getCategoryName(car.category));
    setText(specEngine, car.engine);
    setText(specPower, car.power);
    setText(specTransmission, car.transmission);
    setText(specFuel, car.fuel);

    if (mainCarImage) {
        mainCarImage.src = getImagePath(car.image);
        mainCarImage.alt = `${car.brand} ${car.model}`;
    }
}

function setText(element, value) {
    if (!element) return;

    element.textContent = value ?? "—";
}

function getImagePath(image) {
    if (!image) {
        return "../images/placeholder.jpg";
    }

    if (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("../")
    ) {
        return image;
    }

    if (image.startsWith("./images/")) {
        return `.${image}`;
    }

    return image;
}

function getCategoryName(category) {
    const categories = {
        sedan: "Седан",
        suv: "Кроссовер / Внедорожник",
        sport: "Спортивный автомобиль"
    };

    return categories[category] || category || "—";
}

function formatPrice(price) {
    return new Intl.NumberFormat("ru-RU").format(
        Number(price) || 0
    );
}

loadCarDetails();