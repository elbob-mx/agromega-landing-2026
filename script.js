import { translations } from "./src/languages.js";

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. LÓGICA DE TRADUCCIÓN ---
    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");
    const textsToTranslate = document.querySelectorAll("[data-i18n]");

    const changeLanguage = (lang) => {
        textsToTranslate.forEach((element) => {
            const key = element.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Actualizar visualmente los botones
        if (lang === "es") {
            btnEs.className = "text-primary underline decoration-2 underline-offset-4";
            btnEn.className = "text-gray-400 hover:text-primary transition-colors";
        } else {
            btnEn.className = "text-primary underline decoration-2 underline-offset-4";
            btnEs.className = "text-gray-400 hover:text-primary transition-colors";
        }

        localStorage.setItem("preferredLang", lang);
    };

    btnEs.addEventListener("click", () => changeLanguage("es"));
    btnEn.addEventListener("click", () => changeLanguage("en"));

    const savedLang = localStorage.getItem("preferredLang") || "es";
    changeLanguage(savedLang);

    // --- 2. LÓGICA DEL BUSCADOR (Visual + Funcional) ---
    const searchTrigger = document.getElementById("search-trigger");
    const searchInput = document.getElementById("main-search");

    const solutions = [
        { name: "pulverizadores", id: "#categorias" },
        { name: "guarany", id: "#categorias" },
        { name: "fertilizantes", id: "#categorias" },
        { name: "mezclas", id: "#categorias" },
        { name: "semillas", id: "#categorias" },
        { name: "proteccion", id: "#categorias" },
        { name: "nosotros", id: "#nosotros" },
        { name: "contacto", id: "#contacto" },
    ];

    // Mostrar/Ocultar barra de búsqueda
    searchTrigger.addEventListener("click", () => {
        const isOpen = searchInput.classList.contains("w-64");

        if (isOpen) {
            // Cerrar
            searchInput.classList.remove(
                "w-64",
                "opacity-100",
                "px-4",
                "border-neutral-300",
                "pointer-events-auto",
            );
            searchInput.classList.add(
                "w-0",
                "opacity-0",
                "px-0",
                "border-transparent",
                "pointer-events-none",
            );
        } else {
            // Abrir
            searchInput.classList.remove(
                "w-0",
                "opacity-0",
                "px-0",
                "border-transparent",
                "pointer-events-none",
            );
            searchInput.classList.add(
                "w-64",
                "opacity-100",
                "px-4",
                "border-neutral-300",
                "pointer-events-auto",
            );
            searchInput.focus();
        }
    });

    // Filtrado y Scroll
    searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();

        if (term.length > 2) {
            const match = solutions.find((s) => s.name.toLowerCase().includes(term));

            if (match) {
                const targetElement = document.querySelector(match.id);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }
        }
    });

    // Cerrar buscador al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !searchTrigger.contains(e.target)) {
            searchInput.classList.remove(
                "w-64",
                "opacity-100",
                "px-4",
                "border-neutral-300",
                "pointer-events-auto",
            );
            searchInput.classList.add(
                "w-0",
                "opacity-0",
                "px-0",
                "border-transparent",
                "pointer-events-none",
            );
        }
    });
});
