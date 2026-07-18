"use strict";

// =========================
// FAQ
// =========================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const button = item.querySelector(".faq-item__button");
    const content = item.querySelector(".faq-item__content");

    button.addEventListener("click", () => {
        const isActive = item.classList.contains("faq-item--active");

        faqItems.forEach((faq) => {
            faq.classList.remove("faq-item--active");

            faq.querySelector(".faq-item__content").style.maxHeight = null;
        });

        if (!isActive) {
            item.classList.add("faq-item--active");

            content.style.maxHeight =
                content.scrollHeight + "px";
        }
    });
});


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("contactFormMessage");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const phone =
            document.getElementById("contactPhone").value.trim();

        const topic =
            document.getElementById("contactTopic").value;

        const message =
            document.getElementById("contactMessage").value.trim();

        if (
            !name ||
            !phone ||
            !topic ||
            !message
        ) {
            formMessage.textContent =
                "Пожалуйста, заполните все поля.";

            formMessage.style.color = "#ff4d4d";

            return;
        }

        const whatsappMessage = `
Здравствуйте!

Меня зовут: ${name}

Телефон: ${phone}

Тема:
${topic}

Сообщение:
${message}
        `;

        const whatsappURL =
            `https://wa.me/996224112233?text=${encodeURIComponent(whatsappMessage)}`;

        formMessage.textContent =
            "Перенаправляем в WhatsApp...";

        formMessage.style.color =
            "#d9a441";

        setTimeout(() => {

            window.open(
                whatsappURL,
                "_blank"
            );

            contactForm.reset();

            formMessage.textContent =
                "Спасибо! WhatsApp успешно открыт.";

        }, 600);

    });

}