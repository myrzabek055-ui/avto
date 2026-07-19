const popularCarsContainer = document.getElementById("popularCars");

async function loadPopularCars() {
    try {
        const response = await fetch("data/cars.json");

        if (!response.ok) {
            throw new Error("Автомобилдер жүктөлгөн жок");
        }

        const cars = await response.json();

        const popularCars = cars.slice(0, 3);

        popularCarsContainer.innerHTML = popularCars
            .map((car) => createCarCard(car))
            .join("");
    } catch (error) {
        console.error(error);

        popularCarsContainer.innerHTML = `
            <p class="cars-error">
                Автомобилдерди жүктөөдө ката кетти.
            </p>
        `;
    }
}

function createCarCard(car) {
    return `
        <article class="car-card">

            <div class="car-card__image">

                <img
                    src="${car.image.replace("../", "./")}"
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
                            $${formatPrice(car.price)}
                        </strong>
                    </div>

                    <a
                        href="./pages/car-details.html?id=${car.id}"
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

function formatPrice(price) {
    return new Intl.NumberFormat("ru-RU").format(price);
}

document.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest(
        ".car-card__favorite"
    );

    if (!favoriteButton) {
        return;
    }

    favoriteButton.classList.toggle(
        "car-card__favorite--active"
    );

    const isActive = favoriteButton.classList.contains(
        "car-card__favorite--active"
    );

    favoriteButton.textContent = isActive ? "♥" : "♡";
});

if (popularCarsContainer) {
    loadPopularCars();
}