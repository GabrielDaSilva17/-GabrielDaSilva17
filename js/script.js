// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAuWwdFlmMqPJgJJ3DMyCu3-vxFoubTRU",
    authDomain: "feedback-api-8baf9.firebaseapp.com",
    databaseURL: "https://feedback-api-8baf9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "feedback-api-8baf9",
    storageBucket: "feedback-api-8baf9.firebasestorage.app",
    messagingSenderId: "335137764953",
    appId: "1:335137764953:web:a41a8d7b23f4611b0be348",
    measurementId: "G-LCVPHVGELT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Pages are loaded dynamically from the pages/ directory.


// --- TRADUÇÃO DOS TEXTOS DA ESTRUTURA (Antigo pages/ct.js) ---
const i18n_strings = {
    pt: {
        nav_home: "Home",
        nav_about: "Sobre",
        nav_blog: "Blog",
        nav_contact: "Contato",
        nav_feedback: "Feedback",
        footer_text: "© 2026 Gabriel da Silva. Feito com",
        sending: "Enviando...",
        sent: "Mensagem Enviada!",
        error: "Erro ao enviar",
        send_btn: "Enviar Mensagem",
        offline_saved: "Servidor offline. Mensagem salva na fila!",
        queue_processing: "Processando fila..."
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_blog: "Blog",
        nav_contact: "Contact",
        nav_feedback: "Feedback",
        footer_text: "© 2026 Gabriel da Silva. Made with",
        sending: "Sending...",
        sent: "Message Sent!",
        error: "Error sending",
        send_btn: "Send Message",
        offline_saved: "Server offline. Message saved to queue!",
        queue_processing: "Processing queue..."
    },
    de: {
        nav_home: "Startseite",
        nav_about: "Über Mich",
        nav_blog: "Blog",
        nav_contact: "Kontakt",
        nav_feedback: "Feedback",
        footer_text: "© 2026 Gabriel da Silva. Gemacht mit",
        sending: "Senden...",
        sent: "Nachricht gesendet!",
        error: "Fehler beim Senden",
        send_btn: "Nachricht Senden",
        offline_saved: "Server offline. Nachricht in Warteschlange gespeichert!",
        queue_processing: "Warteschlange wird verarbeitet..."
    }
};

// --- LOGICA DE CONTROLE DA APLICAÇÃO (Antigo script.js) ---
const root = document.getElementById("root");
const navlist = document.getElementById("nav-list");

// Estado global da aplicação
let currentPage = "home";
let currentLang = "pt";

// URL oficial da sua API Flask rodando no Google Cloud Run
const API_URL = "https://flask-sheets-api-385572973833.europe-west1.run.app/api/contatos";

// --- INICIALIZAÇÃO ÚNICA DO SISTEMA ---
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

// Event delegation para o envio dos formulários
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

    if (event.target.id === "feedback-form") {
        event.preventDefault();

        const formData = new FormData(event.target);
        const rawData = Object.fromEntries(formData);

        const data = {
            nome: rawData.visitor_name,
            email: rawData.visitor_email,
            feedback: rawData.visitor_feedback,
            timestamp: new Date().toISOString()
        };

        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = "<span class='spinner'></span> " + (i18n_strings[currentLang].sending || "Enviando...");
        submitBtn.disabled = true;
        submitBtn.classList.add("loading");

        const feedbackRef = ref(db, 'feedbacks');
        const newFeedbackRef = push(feedbackRef);
        
        set(newFeedbackRef, data)
            .then(() => {
                submitBtn.textContent = i18n_strings[currentLang].sent || "Mensagem Enviada!";
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
                console.error("Erro ao salvar no Firebase:", error);
                submitBtn.textContent = i18n_strings[currentLang].error || "Erro ao enviar";
                submitBtn.classList.remove("loading");
                submitBtn.classList.add("error");
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove("error");
                    submitBtn.disabled = false;
                }, 3000);
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

    const lang = currentLang;
    const pagePath = `pages/${lang}/${page}.html`;

    const titles = {
        home: "Gabriel da Silva | " + (i18n_strings[lang].nav_home || "Home"),
        about: "Gabriel da Silva | " + (i18n_strings[lang].nav_about || "Sobre"),
        blog: "Gabriel da Silva | " + (i18n_strings[lang].nav_blog || "Blog"),
        contact: "Gabriel da Silva | " + (i18n_strings[lang].nav_contact || "Contato"),
        feedback: "Gabriel da Silva | " + (i18n_strings[lang].nav_feedback || "Feedback"),
        error: "404 - Not Found"
    };

    const render = (htmlContent) => {
        root.innerHTML = htmlContent;
        document.title = titles[page] || titles.error;

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

    const showError = () => {
        root.innerHTML = `
            <div class="error-container card fade-in">
                <h1 class="accent-text">404</h1>
                <p>Página não encontrada / Page not found / Seite não encontrada</p>
                <a href="#home" data-page="home" class="primary-btn">Back to Home</a>
            </div>
        `;
        root.classList.add("page-404");
        document.title = titles.error;

        document.querySelectorAll("#nav-list a").forEach(link => {
            link.classList.remove("active-link");
        });

        if (animate) root.style.opacity = 1;
    };

    const fetchPage = () => {
        fetch(pagePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Page not found");
                }
                return response.text();
            })
            .then(html => {
                render(html);
            })
            .catch(err => {
                console.warn(`Erro ao carregar página: ${pagePath}`, err);
                showError();
            });
    };

    if (animate) {
        root.style.opacity = 0;
        setTimeout(fetchPage, 200);
    } else {
        fetchPage();
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
}
