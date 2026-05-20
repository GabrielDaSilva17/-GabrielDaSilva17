import { translations, i18n_strings } from "./pages/ct.js";

const root = document.getElementById("root");
const navlist = document.getElementById("nav-list");

// Estado global da aplicação
let currentPage = "home";
let currentLang = "pt";
const API_URL = "https://gabrielapi.serveousercontent.com/api/mensagem";

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");

    // Força carregar a home e os textos iniciais
    updateUIStrings();
    loadPage("home");

    menuToggle.addEventListener("click", () => {
        navlist.classList.toggle("active");
    });

    // Inicia o processador de fila offline (roda a cada 30 segundos)
    setInterval(processQueue, 30000);
    // Tenta processar imediatamente ao carregar a página
    setTimeout(processQueue, 2000);
});

// Event delegation for the nav link clicks
navlist.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault();
        currentPage = event.target.getAttribute("data-page");
        loadPage(currentPage);
        navlist.classList.remove("active");
    }
});

// Event delegation for dynamically loaded links inside main content
document.addEventListener("click", (event) => {
    if (event.target.tagName === "A" && event.target.hasAttribute("data-page") && !navlist.contains(event.target)) {
        event.preventDefault();
        currentPage = event.target.getAttribute("data-page");
        loadPage(currentPage);
    }
});

// Event delegation for language switcher
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("lang-btn")) {
        const selectedLang = event.target.getAttribute("data-lang");
        if (selectedLang !== currentLang) {
            currentLang = selectedLang;

            // Atualiza botões
            document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");

            // Atualiza interface e página atual
            updateUIStrings();
            loadPage(currentPage, false);
        }
    }
});

// Event delegation for the contact form
document.addEventListener("submit", (event) => {
    if (event.target.id === "contact-form") {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = i18n_strings[currentLang].send_btn;
        submitBtn.innerHTML = "<span class='spinner'></span> " + i18n_strings[currentLang].sending;
        submitBtn.disabled = true;
        submitBtn.classList.add("loading");

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) throw new Error("Server error");
                return response.json();
            })
            .then(result => {
                submitBtn.textContent = i18n_strings[currentLang].sent;
                submitBtn.classList.remove("loading");
                submitBtn.classList.add("success");
                event.target.reset();
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove("success");
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.warn("API Offline ou Erro, salvando na fila...", error);

                // Salva na fila do LocalStorage
                saveToQueue(data);

                // Avisa o usuário que foi pra fila
                submitBtn.textContent = i18n_strings[currentLang].offline_saved;
                submitBtn.classList.remove("loading");
                // Usamos uma cor diferente (amarelo/laranja) para "Aviso/Fila"
                submitBtn.style.backgroundColor = "#f57c00";

                event.target.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = "";
                    submitBtn.disabled = false;
                }, 4000);
            });
    }
});

// --- SISTEMA DE FILA OFFLINE (OFFLINE QUEUE) ---

function saveToQueue(data) {
    let queue = JSON.parse(localStorage.getItem("contactQueue") || "[]");
    queue.push(data);
    localStorage.setItem("contactQueue", JSON.stringify(queue));
}

function processQueue() {
    let queue = JSON.parse(localStorage.getItem("contactQueue") || "[]");

    if (queue.length === 0) return;

    // Pega o item mais antigo da fila
    const data = queue[0];

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // Se enviou com sucesso, remove da fila e atualiza o LocalStorage
                queue.shift();
                localStorage.setItem("contactQueue", JSON.stringify(queue));
                console.log("Mensagem da fila enviada com sucesso!");

                // Se ainda tem itens, processa o próximo imediatamente
                if (queue.length > 0) processQueue();
            }
        })
        .catch(error => {
            // Se falhou de novo, apenas ignoramos e tentamos na próxima execução do setInterval
            console.log("Processador de fila: Servidor continua offline.");
        });
}

// --- FUNÇÕES DE RENDERIZAÇÃO E INTERFACE ---

function updateUIStrings() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (i18n_strings[currentLang][key]) {
            element.textContent = i18n_strings[currentLang][key];
        }
    });
}

function loadPage(page, animate = true) {
    root.classList.remove("page-404");

    const contentObj = translations[currentLang];
    const titles = {
        home: "Gabriel da Silva | " + i18n_strings[currentLang].nav_home,
        about: "Gabriel da Silva | " + i18n_strings[currentLang].nav_about,
        contact: "Gabriel da Silva | " + i18n_strings[currentLang].nav_contact,
        error: "404 - Not Found"
    };

    const render = () => {
        if (contentObj[page]) {
            root.innerHTML = contentObj[page];
            document.title = titles[page];
        } else {
            root.innerHTML = `
                <div class="error-container card fade-in">
                    <h1 class="accent-text">404</h1>
                    <p>Página não encontrada / Page not found / Seite nicht gefunden</p>
                    <a href="#home" data-page="home" class="primary-btn">Back to Home</a>
                </div>
            `;
            root.classList.add("page-404");
            document.title = titles.error;
        }

        // Update active nav link
        document.querySelectorAll("#nav-list a").forEach(link => {
            if (link.getAttribute("data-page") === page) {
                link.classList.add("active-link");
            } else {
                link.classList.remove("active-link");
            }
        });

        if (animate) root.style.opacity = 1;
    };

    if (animate) {
        root.style.opacity = 0;
        setTimeout(render, 200);
    } else {
        render();
    }
}