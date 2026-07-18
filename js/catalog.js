"use strict";

const carsCatalog = document.getElementById("carsCatalog");
const carsCount = document.getElementById("carsCount");
const catalogEmpty = document.getElementById("catalogEmpty");

const carSearch = document.getElementById("carSearch");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const resetFilters = document.getElementById("resetFilters");

let allCars = [];

async function loadCatalogCars() {
    try {
        const response = await fetch("../data/cars.json");

        if (!response.ok) {
            throw new Error("Не удалось загрузить автомобили");
        }

        allCars = await response.json();

        renderCatalog(allCars);
    } catch (error) {
        console.error(error);

        if (carsCatalog) {
            carsCatalog.innerHTML = `
                <p class="cars-error">
                    Не удалось загрузить автомобили.
                </p>
            `;
        }
    }
}

function renderCatalog(cars) {
    if (!carsCatalog) return;

    carsCatalog.innerHTML = cars
        .map((car) => createCatalogCard(car))
        .join("");

    if (carsCount) {
        carsCount.textContent = cars.length;
    }

    if (catalogEmpty) {
        if (cars.length === 0) {
            catalogEmpty.classList.add("catalog__empty--visible");
        } else {
            catalogEmpty.classList.remove("catalog__empty--visible");
        }
    }
}

function createCatalogCard(car) {
    return `
        <article class="car-card">

            <div class="car-card__image">

                <img
                    src="${car.image.startsWith('./images/')
                        ? `.${car.image}`
                        : car.image}"
                    alt="${car.brand} ${car.model}"
                >

                <span class="car-card__badge">
                    ${car.badge}
                </span>

                <button
                    class="car-card__favorite"
                    type="button"
                    aria-label="Добавить в избранное"
                    data-car-id="${car.id}"
                >
                    ♡
                </button>

            </div>

            <div class="car-card__content">

                <div class="car-card__top">

                    <div>
                        <p class="car-card__brand">
                            ${car.brand}
                        </p>

                        <h3 class="car-card__title">
                            ${car.model}
                        </h3>
                    </div>

                    <span class="car-card__year">
                        ${car.year}
                    </span>

                </div>

                <div class="car-card__specs">

                    <div class="car-card__spec">
                        <span>Двигатель</span>
                        <strong>${car.engine}</strong>
                    </div>

                    <div class="car-card__spec">
                        <span>Мощность</span>
                        <strong>${car.power}</strong>
                    </div>

                    <div class="car-card__spec">
                        <span>КПП</span>
                        <strong>${car.transmission}</strong>
                    </div>

                </div>

                <div class="car-card__bottom">

                    <div class="car-card__price">
                        <span>Цена</span>

                        <strong>
                            $${formatCatalogPrice(car.price)}
                        </strong>
                    </div>

                    <a
                        href="./car-details.html?id=${car.id}"
                        class="car-card__link"
                    >
                        Подробнее
                        <span>→</span>
                    </a>

                </div>

            </div>

        </article>
    `;
}

function formatCatalogPrice(price) {
    return new Intl.NumberFormat("ru-RU").format(price);
}

function applyFilters() {
    const searchValue = carSearch
        ? carSearch.value.trim().toLowerCase()
        : "";

    const categoryValue = categoryFilter
        ? categoryFilter.value
        : "all";

    const sortValue = sortFilter
        ? sortFilter.value
        : "default";

    let filteredCars = [...allCars];

    if (searchValue) {
        filteredCars = filteredCars.filter((car) => {
            const fullName = `${car.brand} ${car.model}`.toLowerCase();

            return fullName.includes(searchValue);
        });
    }

    if (categoryValue !== "all") {
        filteredCars = filteredCars.filter((car) => {
            return car.category === categoryValue;
        });
    }

    if (sortValue === "price-low") {
        filteredCars.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "price-high") {
        filteredCars.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "year-new") {
        filteredCars.sort((a, b) => b.year - a.year);
    }

    renderCatalog(filteredCars);
}

if (carSearch) {
    carSearch.addEventListener("input", applyFilters);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
}

if (sortFilter) {
    sortFilter.addEventListener("change", applyFilters);
}

if (resetFilters) {
    resetFilters.addEventListener("click", () => {
        if (carSearch) {
            carSearch.value = "";
        }

        if (categoryFilter) {
            categoryFilter.value = "all";
        }

        if (sortFilter) {
            sortFilter.value = "default";
        }

        renderCatalog(allCars);
    });
}

document.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest(
        ".car-card__favorite"
    );

    if (!favoriteButton) return;

    favoriteButton.classList.toggle(
        "car-card__favorite--active"
    );

    const isActive = favoriteButton.classList.contains(
        "car-card__favorite--active"
    );

    favoriteButton.textContent = isActive ? "♥" : "♡";
});

loadCatalogCars();