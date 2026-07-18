"use strict";

const testDriveForm = document.getElementById("testDriveForm");
const formMessage = document.getElementById("formMessage");

function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;

    formMessage.classList.remove(
        "form-message--success",
        "form-message--error"
    );

    formMessage.classList.add(`form-message--${type}`);
}

function validatePhone(phone) {
    const cleanedPhone = phone.replace(/[\s()-]/g, "");

    const phonePattern = /^\+996\d{9}$/;

    return phonePattern.test(cleanedPhone);
}

if (testDriveForm) {
    testDriveForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(testDriveForm);

        const name = formData.get("name").trim();
        const phone = formData.get("phone").trim();
        const carModel = formData.get("carModel");

        if (name.length < 2) {
            showFormMessage(
                "Пожалуйста, введите корректное имя.",
                "error"
            );

            return;
        }

        if (!validatePhone(phone)) {
            showFormMessage(
                "Введите номер в формате +996 555 00 00 00.",
                "error"
            );

            return;
        }

        if (!carModel) {
            showFormMessage(
                "Выберите автомобиль для тест-драйва.",
                "error"
            );

            return;
        }

        showFormMessage(
            `${name}, ваша заявка на ${carModel} успешно отправлена!`,
            "success"
        );

        testDriveForm.reset();

        setTimeout(() => {
            formMessage.textContent = "";

            formMessage.classList.remove(
                "form-message--success",
                "form-message--error"
            );
        }, 7000);
    });
}