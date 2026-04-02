import { translations } from "./src/languages.js";

document.addEventListener("DOMContentLoaded", () => {
    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");
    const textsToTranslate = document.querySelectorAll("[data-i18n]");

    const changeLanguage = (lang) => {
        // Cambiar todos los textos con el atributo data-i18n
        textsToTranslate.forEach((element) => {
            const key = element.getAttribute("data-i18n");
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Actualizar visualmente los botones
        if (lang === "es") {
            btnEs.classList.add("text-primary", "underline");
            btnEs.classList.remove("text-gray-400");
            btnEn.classList.remove("text-primary", "underline");
            btnEn.classList.add("text-gray-400");
        } else {
            btnEn.classList.add("text-primary", "underline");
            btnEn.classList.remove("text-gray-400");
            btnEs.classList.remove("text-primary", "underline");
            btnEs.classList.add("text-gray-400");
        }

        // Guardar preferencia (opcional pero recomendado)
        localStorage.setItem("preferredLang", lang);
    };

    // Listeners para los botones
    btnEs.addEventListener("click", () => changeLanguage("es"));
    btnEn.addEventListener("click", () => changeLanguage("en"));

    // Cargar idioma guardado o defecto es
    const savedLang = localStorage.getItem("preferredLang") || "es";
    changeLanguage(savedLang);
});
