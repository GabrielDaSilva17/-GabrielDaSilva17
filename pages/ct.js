const translations = {
    pt: {
        home: `
            <div class="hero-section fade-in">
                <div class="hero-content">
                    <h2 class="greeting">Olá, eu sou</h2>
                    <h1 class="hero-title">Gabriel da Silva</h1>
                    <p class="hero-subtitle">Desenvolvedor Web & Entusiasta de Tecnologia</p>
                    <div class="hero-buttons">
                        <a href="#about" data-page="about" class="primary-btn">Sobre Mim</a>
                        <a href="#contact" data-page="contact" class="secondary-btn">Entrar em Contato</a>
                    </div>
                </div>
            </div>
        `,
        about: `
            <div class="about-section fade-in">
                <h1 class="title-center">Sobre Mim</h1>
                <div class="about-grid">
                    <div class="card">
                        <h3>🌍 Minha Trajetória</h3>
                        <p>Atualmente moro na Alemanha e estou no 3º ano do meu <i>Ausbildung</i> (formação técnica) como <b>Mecânico Industrial</b> na <b>Opel</b>, em Kaiserslautern. Embora minha profissão principal seja na área industrial, minha verdadeira paixão sempre foi a tecnologia, e por isso estudo programação de forma <b>100% autodidata</b>.</p>
                    </div>
                    
                    <div class="card">
                        <h3>🚀 Habilidades & Tecnologias</h3>
                        <p style="margin-bottom: 15px; color: var(--text-secondary); font-size: 14px;">Construo websites, APIs e até jogos!</p>
                        <div class="skills-tags">
                            <span>Python</span>
                            <span>Node.js</span>
                            <span>JavaScript</span>
                            <span>PHP</span>
                            <span>Godot (2D/3D)</span>
                            <span>HTML/CSS</span>
                        </div>
                    </div>

                    <div class="card">
                        <h3>💼 Meus Serviços</h3>
                        <p>Para praticar e ganhar dinheiro extra, ofereço serviços freelance de <b>criação de Back-end e Servidores</b> com interface visual para projetos pessoais. Gosto muito de ajudar a tirar ideias do papel como um hobby remunerado!</p>
                    </div>

                    <div class="card">
                        <h3>🚲 Hobbies & Vida Pessoal</h3>
                        <p>No meu tempo livre, quando não estou programando novos projetos (como este portfólio), gosto de sair para passear com minha namorada, dar uma volta de <b>E-Roller (patinete elétrico)</b> ou andar de bicicleta pela natureza.</p>
                    </div>
                </div>
            </div>
        `,
        contact: `
            <div class="contact-section fade-in">
                <div class="card contact-card">
                    <h1>Fale Comigo</h1>
                    <p class="subtitle">Tem um projeto em mente? Vamos conversar!</p>
                    <form id="contact-form" class="modern-form">
                        <div class="input-group">
                            <label for="name">Seu Nome</label>
                            <input type="text" id="name" name="nome" required placeholder="Digite seu nome">
                        </div>
                        <div class="input-group">
                            <label for="email">Seu E-mail</label>
                            <input type="email" id="email" name="gmail" required placeholder="Digite seu e-mail">
                        </div>
                        <div class="input-group">
                            <label for="message">Sua Mensagem</label>
                            <textarea id="message" name="messager" required placeholder="Como posso ajudar?"></textarea>
                        </div>
                        <button type="submit" class="primary-btn submit-btn">Enviar Mensagem</button>
                    </form>
                </div>
            </div>
        `
    },
    en: {
        home: `
            <div class="hero-section fade-in">
                <div class="hero-content">
                    <h2 class="greeting">Hello, I'm</h2>
                    <h1 class="hero-title">Gabriel da Silva</h1>
                    <p class="hero-subtitle">Web Developer & Tech Enthusiast</p>
                    <div class="hero-buttons">
                        <a href="#about" data-page="about" class="primary-btn">About Me</a>
                        <a href="#contact" data-page="contact" class="secondary-btn">Contact Me</a>
                    </div>
                </div>
            </div>
        `,
        about: `
            <div class="about-section fade-in">
                <h1 class="title-center">About Me</h1>
                <div class="about-grid">
                    <div class="card">
                        <h3>🌍 My Journey</h3>
                        <p>I currently live in Germany and I'm in my 3rd year of an <i>Ausbildung</i> (technical training) as an <b>Industrial Mechanic</b> at <b>Opel</b> in Kaiserslautern. Even though my main profession is in the industrial field, my true passion has always been technology. That's why I am a <b>100% self-taught</b> programmer.</p>
                    </div>
                    
                    <div class="card">
                        <h3>🚀 Skills & Technologies</h3>
                        <p style="margin-bottom: 15px; color: var(--text-secondary); font-size: 14px;">I build websites, APIs, and even games!</p>
                        <div class="skills-tags">
                            <span>Python</span>
                            <span>Node.js</span>
                            <span>JavaScript</span>
                            <span>PHP</span>
                            <span>Godot (2D/3D)</span>
                            <span>HTML/CSS</span>
                        </div>
                    </div>

                    <div class="card">
                        <h3>💼 My Services</h3>
                        <p>To practice and earn some extra money, I offer freelance services such as <b>Backend and Server Creation</b> with visual interfaces for personal projects. I really enjoy bringing ideas to life as a paid hobby!</p>
                    </div>

                    <div class="card">
                        <h3>🚲 Hobbies & Personal Life</h3>
                        <p>In my free time, when I'm not coding new projects (like this portfolio), I like going out with my girlfriend, riding my <b>E-Roller (electric scooter)</b>, or cycling through nature.</p>
                    </div>
                </div>
            </div>
        `,
        contact: `
            <div class="contact-section fade-in">
                <div class="card contact-card">
                    <h1>Contact Me</h1>
                    <p class="subtitle">Have a project in mind? Let's talk!</p>
                    <form id="contact-form" class="modern-form">
                        <div class="input-group">
                            <label for="name">Your Name</label>
                            <input type="text" id="name" name="nome" required placeholder="Enter your name">
                        </div>
                        <div class="input-group">
                            <label for="email">Your E-mail</label>
                            <input type="email" id="email" name="gmail" required placeholder="Enter your e-mail">
                        </div>
                        <div class="input-group">
                            <label for="message">Your Message</label>
                            <textarea id="message" name="messager" required placeholder="How can I help you?"></textarea>
                        </div>
                        <button type="submit" class="primary-btn submit-btn">Send Message</button>
                    </form>
                </div>
            </div>
        `
    },
    de: {
        home: `
            <div class="hero-section fade-in">
                <div class="hero-content">
                    <h2 class="greeting">Hallo, ich bin</h2>
                    <h1 class="hero-title">Gabriel da Silva</h1>
                    <p class="hero-subtitle">Webentwickler & Technik-Enthusiast</p>
                    <div class="hero-buttons">
                        <a href="#about" data-page="about" class="primary-btn">Über Mich</a>
                        <a href="#contact" data-page="contact" class="secondary-btn">Kontakt</a>
                    </div>
                </div>
            </div>
        `,
        about: `
            <div class="about-section fade-in">
                <h1 class="title-center">Über Mich</h1>
                <div class="about-grid">
                    <div class="card">
                        <h3>🌍 Mein Werdegang</h3>
                        <p>Ich lebe derzeit in Deutschland und befinde mich im 3. Jahr meiner <i>Ausbildung</i> zum <b>Industriemechaniker</b> bei <b>Opel</b> in Kaiserslautern. Obwohl mein Hauptberuf im industriellen Bereich liegt, war meine wahre Leidenschaft schon immer die Technologie. Deshalb bringe ich mir das Programmieren zu <b>100% autodidaktisch</b> bei.</p>
                    </div>
                    
                    <div class="card">
                        <h3>🚀 Fähigkeiten & Technologien</h3>
                        <p style="margin-bottom: 15px; color: var(--text-secondary); font-size: 14px;">Ich baue Websites, APIs und sogar Spiele!</p>
                        <div class="skills-tags">
                            <span>Python</span>
                            <span>Node.js</span>
                            <span>JavaScript</span>
                            <span>PHP</span>
                            <span>Godot (2D/3D)</span>
                            <span>HTML/CSS</span>
                        </div>
                    </div>

                    <div class="card">
                        <h3>💼 Meine Dienstleistungen</h3>
                        <p>Um zu üben und etwas dazuzuverdienen, biete ich freiberufliche Dienstleistungen wie <b>Backend- und Servererstellung</b> mit visuellen Schnittstellen für persönliche Projekte an. Es macht mir großen Spaß, Ideen als bezahltes Hobby zum Leben zu erwecken!</p>
                    </div>

                    <div class="card">
                        <h3>🚲 Hobbys & Privatleben</h3>
                        <p>In meiner Freizeit, wenn ich nicht gerade neue Projekte (wie dieses Portfolio) programmiere, gehe ich gerne mit meiner Freundin spazieren, fahre mit meinem <b>E-Roller</b> oder fahre mit dem Fahrrad durch die Natur.</p>
                    </div>
                </div>
            </div>
        `,
        contact: `
            <div class="contact-section fade-in">
                <div class="card contact-card">
                    <h1>Kontakt</h1>
                    <p class="subtitle">Haben Sie ein Projekt im Sinn? Lassen Sie uns reden!</p>
                    <form id="contact-form" class="modern-form">
                        <div class="input-group">
                            <label for="name">Ihr Name</label>
                            <input type="text" id="name" name="nome" required placeholder="Geben Sie Ihren Namen ein">
                        </div>
                        <div class="input-group">
                            <label for="email">Ihre E-Mail</label>
                            <input type="email" id="email" name="gmail" required placeholder="Geben Sie Ihre E-Mail ein">
                        </div>
                        <div class="input-group">
                            <label for="message">Ihre Nachricht</label>
                            <textarea id="message" name="messager" required placeholder="Wie kann ich helfen?"></textarea>
                        </div>
                        <button type="submit" class="primary-btn submit-btn">Nachricht Senden</button>
                    </form>
                </div>
            </div>
        `
    }
};

const i18n_strings = {
    pt: {
        nav_home: "Home",
        nav_about: "Sobre",
        nav_contact: "Contato",
        footer_text: "© 2026 Gabriel da Silva. Feito com",
        sending: "Enviando...",
        sent: "Mensagem Enviada!",
        error: "Erro ao enviar",
        send_btn: "Enviar Mensagem"
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_contact: "Contact",
        footer_text: "© 2026 Gabriel da Silva. Made with",
        sending: "Sending...",
        sent: "Message Sent!",
        error: "Error sending",
        send_btn: "Send Message"
    },
    de: {
        nav_home: "Startseite",
        nav_about: "Über Mich",
        nav_contact: "Kontakt",
        footer_text: "© 2026 Gabriel da Silva. Gemacht mit",
        sending: "Senden...",
        sent: "Nachricht gesendet!",
        error: "Fehler beim Senden",
        send_btn: "Nachricht Senden"
    }
};

export { translations, i18n_strings };