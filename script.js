import { translations, i18n_strings } from "./pages/ct.js";

const root = document.getElementById("root");
const navlist = document.getElementById("nav-list");

// Estado global da aplicação
let currentPage = "home";
let currentLang = "pt";

// URL oficial da sua API Flask rodando no Google Cloud Run
const API_URL = "https://flask-sheets-api-385572973833.europe-west1.run.app/api/contatos";

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

// Event delegation para os cliques nos links de navegação
navlist.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault();
        currentPage = event.target.getAttribute("data-page");
        loadPage(currentPage);
        navlist.classList.remove("active");
    }
});

// Event delegation para links carregados dinamicamente dentro do main
document.addEventListener("click", (event) => {
    if (event.target.tagName === "A" && event.target.hasAttribute("data-page") && !navlist.contains(event.target)) {
        event.preventDefault();
        currentPage = event.target.getAttribute("data-page");
        loadPage(currentPage);
    }
});

// Event delegation para o alternador de idiomas
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("lang-btn")) {
        const selectedLang = event.target.getAttribute("data-lang");
        if (selectedLang !== currentLang) {
            currentLang = selectedLang;

            // Atualiza os botões ativos
            document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");

            // Atualiza a interface e a página atual
            updateUIStrings();
            loadPage(currentPage, false);
        }
    }
});

// Event delegation para o formulário de contato
document.addEventListener("submit", (event) => {
    if (event.target.id === "contact-form") {
        event.preventDefault();

        const formData = new FormData(event.target);
        const rawData = Object.fromEntries(formData);

        // Normalização: mapeia as chaves do form HTML para os nomes que o Flask espera
        const data = {
            nome: rawData.nome,
            email: rawData.gmail || rawData.email,
            mensagem: rawData.messager || rawData.mensagem
        };

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
                if (!response.ok) throw new Error("Erro no servidor");
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

                // Salva na fila do LocalStorage se a rede ou servidor falhar
                saveToQueue(data);

                // Avisa o usuário que o envio foi agendado offline
                submitBtn.textContent = i18n_strings[currentLang].offline_saved;
                submitBtn.classList.remove("loading");
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

    // Envia o item mais antigo da fila pendente
    const data = queue[0];

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // Se enviado, remove da fila e atualiza o LocalStorage
                queue.shift();
                localStorage.setItem("contactQueue", JSON.stringify(queue));
                console.log("Mensagem offline enviada com sucesso!");

                // Continua processando itens restantes da fila
                if (queue.length > 0) processQueue();
            }
        })
        .catch(error => {
            console.log("Processador de fila: Servidor continua inacessível.");
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
        blog: "Gabriel da Silva | " + i18n_strings[currentLang].nav_blog,
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

        // Atualiza a classe ativa do cabeçalho
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

// ==========================================================================
// SISTEMA DE COOKIES E POPUP DE IDIOMA
// ==========================================================================

function setLanguageCookie(value, days = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = "user_language=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function getLanguageCookie() {
    const name = "user_language=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = getLanguageCookie();
    const popup = document.getElementById("lang-popup");

    if (savedLang) {
        currentLang = savedLang;

        document.querySelectorAll(".lang-btn").forEach(btn => {
            if (btn.getAttribute("data-lang") === savedLang) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        updateUIStrings();
        loadPage(currentPage);
    } else {
        if (popup) {
            popup.classList.remove("lang-popup-hidden");
        }
    }

    document.querySelectorAll(".popup-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const selected = btn.getAttribute("data-lang-choice");

            setLanguageCookie(selected, 1);
            currentLang = selected;

            document.querySelectorAll(".lang-btn").forEach(headerBtn => {
                if (headerBtn.getAttribute("data-lang") === selected) {
                    headerBtn.classList.add("active");
                } else {
                    headerBtn.classList.remove("active");
                }
            });

            updateUIStrings();
            loadPage(currentPage, false);

            if (popup) {
                popup.classList.add("lang-popup-hidden");
            }
        });
    });
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("lang-btn")) {
        const selectedLang = event.target.getAttribute("data-lang");
        setLanguageCookie(selectedLang, 1);
    }
});
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
        blog: "Gabriel da Silva | " + i18n_strings[currentLang].nav_blog,
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

// ==========================================================================
// SISTEMA DE COOKIES E POPUP DE IDIOMA
// ==========================================================================

// Função para salvar Cookies (Validade padrão: 1 dia)
function setLanguageCookie(value, days = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = "user_language=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

// Função para buscar Cookie salvo
function getLanguageCookie() {
    const name = "user_language=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Execução e lógica de controle ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = getLanguageCookie();
    const popup = document.getElementById("lang-popup");

    if (savedLang) {
        // Se já existe cookie, usa o idioma salvo e não exibe o popup
        currentLang = savedLang;

        // Sincroniza a classe ativa nos botões do header
        document.querySelectorAll(".lang-btn").forEach(btn => {
            if (btn.getAttribute("data-lang") === savedLang) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Atualiza a tela com o idioma do cookie
        updateUIStrings();
        loadPage(currentPage);
    } else {
        // Se NÃO existe cookie, exibe o popup removendo a classe hidden
        if (popup) {
            popup.classList.remove("lang-popup-hidden");
        }
    }

    // Configura a ação de clique nos botões do POPUP
    document.querySelectorAll(".popup-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const selected = btn.getAttribute("data-lang-choice");

            // Define o cookie para expirar em 1 dia
            setLanguageCookie(selected, 1);

            // Atualiza o estado global da aplicação
            currentLang = selected;

            // Sincroniza visualmente os botões do cabeçalho original
            document.querySelectorAll(".lang-btn").forEach(headerBtn => {
                if (headerBtn.getAttribute("data-lang") === selected) {
                    headerBtn.classList.add("active");
                } else {
                    headerBtn.classList.remove("active");
                }
            });

            // Atualiza a interface e a página ativa
            updateUIStrings();
            loadPage(currentPage, false);

            // Esconde o popup com transição suave
            if (popup) {
                popup.classList.add("lang-popup-hidden");
            }
        });
    });
});

// Adiciona compatibilidade para salvar cookies também se ele mudar o idioma no HEADER do site
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("lang-btn")) {
        const selectedLang = event.target.getAttribute("data-lang");
        // Salva a nova escolha no cookie por 1 dia
        setLanguageCookie(selectedLang, 1);
    }
});
