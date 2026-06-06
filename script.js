import { translations, i18n_strings } from "./pages/ct.js";

const root = document.getElementById("root");
const navlist = document.getElementById("nav-list");

// Estado global da aplicação
let currentPage = "home";
let currentLang = "pt";

// URL oficial da sua API Flask rodando no Google Cloud Run
const API_URL = "https://flask-sheets-api-385572973833.europe-west1.run.app/api/contatos";

// --- INICIALIZAÇÃO ÚNICA DO SISTEMA (Evita conflitos de renderização) ---
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const popup = document.getElementById("lang-popup");

    // Configura o menu hambúrguer para dispositivos móveis
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navlist.classList.toggle("active");
        });
    }

    // 1. Verifica se já existe um idioma salvo nos cookies do usuário
    const savedLang = getLanguageCookie();

    if (savedLang) {
        currentLang = savedLang;

        // Sincroniza a classe ativa nos botões do cabeçalho
        document.querySelectorAll(".lang-btn").forEach(btn => {
            if (btn.getAttribute("data-lang") === savedLang) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        updateUIStrings();
        loadPage("home");
    } else {
        // Se NÃO existir cookie de idioma, define português como padrão e exibe o popup
        currentLang = "pt";
        updateUIStrings();
        loadPage("home");

        if (popup) {
            popup.classList.remove("lang-popup-hidden");
        }
    }

    // 2. Configura os cliques nos botões do POPUP de idiomas
    document.querySelectorAll(".popup-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const selected = btn.getAttribute("data-lang-choice");

            // Salva a escolha do cookie por 1 dia
            setLanguageCookie(selected, 1);
            currentLang = selected;

            // Sincroniza visualmente os botões do cabeçalho
            document.querySelectorAll(".lang-btn").forEach(headerBtn => {
                if (headerBtn.getAttribute("data-lang") === selected) {
                    headerBtn.classList.add("active");
                } else {
                    headerBtn.classList.remove("active");
                }
            });

            // Atualiza os textos e recarrega a página ativa sem animação brusca
            updateUIStrings();
            loadPage(currentPage, false);

            if (popup) {
                popup.classList.add("lang-popup-hidden");
            }
        });
    });

    // Inicia o processador de fila offline para rodar a cada 30 segundos
    setInterval(processQueue, 30000);
    // Tenta processar mensagens salvas na fila 2 segundos após carregar o app
    setTimeout(processQueue, 2000);
});

// Event delegation para os cliques nos links de navegação do menu
navlist.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault();
        currentPage = event.target.getAttribute("data-page");
        loadPage(currentPage);
        navlist.classList.remove("active");
    }
});

// Event delegation para links carregados dinamicamente no conteúdo principal (botões da Home)
document.addEventListener("click", (event) => {
    if (event.target.tagName === "A" && event.target.hasAttribute("data-page") && !navlist.contains(event.target)) {
        event.preventDefault();
        currentPage = event.target.getAttribute("data-page");
        loadPage(currentPage);
    }
});

// Event delegation para alteração rápida de idioma através do menu do cabeçalho
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("lang-btn")) {
        const selectedLang = event.target.getAttribute("data-lang");
        if (selectedLang !== currentLang) {
            currentLang = selectedLang;

            // Atualiza os botões ativos do cabeçalho
            document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");

            // Salva a nova escolha no cookie por 1 dia
            setLanguageCookie(selectedLang, 1);

            // Atualiza a interface e recarrega a página atual
            updateUIStrings();
            loadPage(currentPage, false);
        }
    }
});

// Event delegation para o envio do formulário de contato
document.addEventListener("submit", (event) => {
    if (event.target.id === "contact-form") {
        event.preventDefault();

        const formData = new FormData(event.target);
        const rawData = Object.fromEntries(formData);

        // Mapeia os campos do HTML (nome, gmail, messager) para o padrão esperado pelo seu Flask
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
                if (!response.ok) throw new Error("Erro no servidor.");
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
                console.warn("API offline ou inacessível. Salvando na fila local...", error);

                // Em caso de falha de conexão, guarda os dados na fila local
                saveToQueue(data);

                // Exibe o feedback visual de agendamento offline
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

    // Obtém o envio pendente mais antigo da fila
    const data = queue[0];

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // Remove o item enviado da fila e atualiza o armazenamento
                queue.shift();
                localStorage.setItem("contactQueue", JSON.stringify(queue));
                console.log("Mensagem da fila offline enviada com sucesso!");

                // Se houver mais itens na fila, processa o seguinte imediatamente
                if (queue.length > 0) processQueue();
            }
        })
        .catch(error => {
            console.log("Processador de fila: O servidor Flask permanece offline.");
        });
}

// --- FUNÇÕES DE RENDERIZAÇÃO E INTERFACE ---

function updateUIStrings() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (i18n_strings[currentLang] && i18n_strings[currentLang][key]) {
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
        if (contentObj && contentObj[page]) {
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

        // Atualiza visualmente a aba de navegação selecionada
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

// --- CONTROLE DE COOKIES ---

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
}                    headerBtn.classList.remove("active");
                }
            });

            // Atualiza os textos estruturais e a página ativa (sem transição brusca)
            updateUIStrings();
            loadPage(currentPage, false);

            // Esconde o popup com transição suave
            if (popup) {
                popup.classList.add("lang-popup-hidden");
            }
        });
    });

    // Inicia o processador de fila offline para rodar a cada 30 segundos
    setInterval(processQueue, 30000);
    // Tenta processar mensagens salvas na fila 2 segundos após carregar o app
    setTimeout(processQueue, 2000);
});

// Event delegation para os cliques nos links de navegação do menu
navlist.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault();
        currentPage = event.target.getAttribute("data-page");
        loadPage(currentPage);
        navlist.classList.remove("active");
    }
});

// Event delegation para links carregados dinamicamente no conteúdo principal (botões da Home)
document.addEventListener("click", (event) => {
    if (event.target.tagName === "A" && event.target.hasAttribute("data-page") && !navlist.contains(event.target)) {
        event.preventDefault();
        currentPage = event.target.getAttribute("data-page");
        loadPage(currentPage);
    }
});

// Event delegation para alteração rápida de idioma através do menu do cabeçalho
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("lang-btn")) {
        const selectedLang = event.target.getAttribute("data-lang");
        if (selectedLang !== currentLang) {
            currentLang = selectedLang;

            // Atualiza os botões ativos do cabeçalho
            document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");

            // Salva a nova escolha do usuário no cookie por 1 dia
            setLanguageCookie(selectedLang, 1);

            // Atualiza a interface de idiomas e recarrega a página atual
            updateUIStrings();
            loadPage(currentPage, false);
        }
    }
});

// Event delegation para o envio do formulário de contato
document.addEventListener("submit", (event) => {
    if (event.target.id === "contact-form") {
        event.preventDefault();

        const formData = new FormData(event.target);
        const rawData = Object.fromEntries(formData);

        // Mapeia os campos do HTML (nome, gmail, messager) para o padrão esperado pela sua API Flask
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
                if (!response.ok) throw new Error("Erro de comunicação com o servidor.");
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
                console.warn("API offline ou inacessível. Salvando na fila local...", error);

                // Em caso de falha de conexão, guarda os dados na fila local
                saveToQueue(data);

                // Exibe o feedback visual de agendamento offline
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

    // Obtém o envio pendente mais antigo da fila
    const data = queue[0];

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // Remove o item enviado da fila e atualiza o armazenamento
                queue.shift();
                localStorage.setItem("contactQueue", JSON.stringify(queue));
                console.log("Mensagem da fila offline enviada com sucesso para o Sheets!");

                // Se houver mais itens na fila, processa o seguinte imediatamente
                if (queue.length > 0) processQueue();
            }
        })
        .catch(error => {
            console.log("Processador de fila: O servidor Flask permanece offline.");
        });
}

// --- FUNÇÕES DE RENDERIZAÇÃO E INTERFACE ---

function updateUIStrings() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (i18n_strings[currentLang] && i18n_strings[currentLang][key]) {
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
        if (contentObj && contentObj[page]) {
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

        // Atualiza visualmente a aba de navegação selecionada
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

// --- CONTROLE DE COOKIES ---

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
            }        const formData = new FormData(event.target);
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
