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
                        <p>Atualmente moro na Alemanha e estou no 3º ano do meu <i>Ausbildung</i> (formação técnica) como <b>Mecânico Industrial</b> na <b>Opel</b>, em Kaiserslautern. Embora minha profissão principal seja na área industrial, minha verdadeira passion sempre foi a tecnologia, e por isso estudo programação de forma <b>100% autodidata</b>.</p>
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

                    <div class="card architecture-card">
                        <h3>⚙️ Curiosidade: Como funciona a API do Contato?</h3>
                        <p>Para receber mensagens no formulário de contato, eu não uso serviços prontos de terceiros. Eu criei minha própria <b>API RESTful usando Python (Flask)</b>. Ela roda de forma robusta e altamente escalável em servidores serverless no <b>Google Cloud Run</b>! 🚀</p>
                        <p>A API recebe os dados de forma segura, salva na nuvem em uma planilha de banco de dados do <b>Google Sheets</b> de maneira assíncrona, e me envia um alerta detalhado via e-mail corporativo. Além disso, se por acaso você perder a internet no seu navegador durante o envio, este site possui uma <b>Fila Offline</b> inteligente que guarda sua mensagem em cache local e faz a entrega de forma invisível assim que a conexão se restabelecer. Engenharia de ponta desenvolvida por mim!</p>
                    </div>
                </div>
            </div>
        `,
        blog: `
            <div class="about-section fade-in">
                <h1 class="title-center">Blog & Artigos</h1>
                <p class="subtitle" style="text-align: center; margin-bottom: 30px;">Escrevo sobre Linux, servidores e automação no meu blog no Blogger.</p>
                <div class="about-grid">
                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEikmGf2DgiXIFtW8hHJ2rHcDEBnu6c6toUhv2xhigMfUNCH0MyA9QiVnwlvYXtY5ysQdpcpPBhyxXgo9ITRXGsSaLofiijNh-YYH9FcZdsQ9kz8qau2zj7RClq2FugQhgsRivY8B4jwqxHk6m6t9riHZoRctsPirm9HMty_OhC6wiRqJQ5SMyOdKm5VIC8=w800" alt="Termux Ultra Edition" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>🚀 Termux ULTRA EDITION 2026: O Setup Definitivo para Android</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 Março 2026 · 🏷️ Linux</p>
                        <p>Transforme seu Termux em uma estação de trabalho de elite! Script de automação que instala Python, Node.js, PHP, servidor SSH, ambiente gráfico X11 e muito mais.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>Termux</span>
                            <span>Linux</span>
                            <span>Python</span>
                            <span>Node.js</span>
                            <span>SSH</span>
                        </div>
                        <a href="https://termux-blog-g.blogspot.com/2026/03/termux-ultra-edition-2026-o-setup.html" target="_blank" class="primary-btn" style="margin-top: 10px; display: inline-block;">Ler Artigo Completo</a>
                    </div>
                    
                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMiMzFjq16-kV8FJGTdwEwgYkR8WkUU6aWPZUp4beP29LWQpfhAZL8QtMAEQFb7NKw43V7089bv2u23eScHNCL4wtNXYvEuTw7EQ_26lobVXX9v0R-rNb2X-TaZPWhaJJZYzYJkJNAPcmMp54WSoGnYiLOXPLMLDAWkJORMNwyxvXnKfiu9yWGG7bjllo/w320-h189-rw/Captura%20de%20tela%202026-05-20%20082602.png" alt="Nexus Downloader" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>💚 Nexus Downloader: Interface para yt-dlp em C#</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 Maio 2026 · 🏷️ Automação</p>
                        <p>Baixe vídeos ou extraia áudios de qualquer site sem terminais complexos! Layout Escuro moderno, instalador automático do yt-dlp e barra de progresso em tempo real.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>C#</span>
                            <span>Windows Forms</span>
                            <span>yt-dlp</span>
                            <span>Automação</span>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                            <a href="https://termux-blog-g.blogspot.com/2026/05/nexus-downloader.html" target="_blank" class="primary-btn" style="flex: 1; text-align: center; font-size: 13px;">📖 Ler no Blog</a>
                            <a href="https://github.com/GabrielDaSilva17/Nuxus-Downloader" target="_blank" class="secondary-btn" style="flex: 1; text-align: center; font-size: 13px;">💻 Ver Código</a>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://termux-blog-g.blogspot.com/search/label/Linux" target="_blank" class="secondary-btn">🌐 Ver Todos os Artigos no Blogger</a>
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

                    <div class="card architecture-card">
                        <h3>⚙️ Behind the Scenes: The Contact API</h3>
                        <p>I don't use ready-made third-party services to handle the contact form. I built my own <b>RESTful API using Python (Flask)</b>. It runs securely and highly scalably on serverless servers in <b>Google Cloud Run</b>! 🚀</p>
                        <p>The API receives your message data safely, saves it asynchronously into a cloud spreadsheet database in <b>Google Sheets</b>, and sends me a formatted notification via corporate e-mail. Furthermore, if you lose your internet connection while sending, this website features an intelligent <b>Offline Queue</b> that caches your message locally and automatically submits it the instant you are back online. Custom high-performance engineering!</p>
                    </div>
                </div>
            </div>
        `,
        blog: `
            <div class="about-section fade-in">
                <h1 class="title-center">Blog & Articles</h1>
                <p class="subtitle" style="text-align: center; margin-bottom: 30px;">I write about Linux, servers and automation on my Blogger blog.</p>
                <div class="about-grid">
                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEikmGf2DgiXIFtW8hHJ2rHcDEBnu6c6toUhv2xhigMfUNCH0MyA9QiVnwlvYXtY5ysQdpcpPBhyxXgo9ITRXGsSaLofiijNh-YYH9FcZdsQ9kz8qau2zj7RClq2FugQhgsRivY8B4jwqxHk6m6t9riHZoRctsPirm9HMty_OhC6wiRqJQ5SMyOdKm5VIC8=w800" alt="Termux Ultra Edition" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>🚀 Termux ULTRA EDITION 2026: The Ultimate Setup for Android</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 March 2026 · 🏷️ Linux</p>
                        <p>Transform your Termux into an elite workstation! An automation script that installs Python, Node.js, PHP, SSH server, X11 graphical environment and much more.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>Termux</span>
                            <span>Linux</span>
                            <span>Python</span>
                            <span>Node.js</span>
                            <span>SSH</span>
                        </div>
                        <a href="https://termux-blog-g.blogspot.com/2026/03/termux-ultra-edition-2026-o-setup.html" target="_blank" class="primary-btn" style="margin-top: 10px; display: inline-block;">Read Full Article</a>
                    </div>

                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMiMzFjq16-kV8FJGTdwEwgYkR8WkUU6aWPZUp4beP29LWQpfhAZL8QtMAEQFb7NKw43V7089bv2u23eScHNCL4wtNXYvEuTw7EQ_26lobVXX9v0R-rNb2X-TaZPWhaJJZYzYJkJNAPcmMp54WSoGnYiLOXPLMLDAWkJORMNwyxvXnKfiu9yWGG7bjllo/w320-h189-rw/Captura%20de%20tela%202026-05-20%20082602.png" alt="Nexus Downloader" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>💚 Nexus Downloader: C# GUI for yt-dlp</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 May 2026 · 🏷️ Automation</p>
                        <p>Download video or extract high-quality audio without command terminals! Modern Dark theme, automatic background yt-dlp downloader, and fluid UI process mapping.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>C#</span>
                            <span>Windows Forms</span>
                            <span>yt-dlp</span>
                            <span>Automation</span>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                            <a href="https://termux-blog-g.blogspot.com/2026/05/nexus-downloader.html" target="_blank" class="primary-btn" style="flex: 1; text-align: center; font-size: 13px;">📖 Read on Blog</a>
                            <a href="https://github.com/GabrielDaSilva17/Nuxus-Downloader" target="_blank" class="secondary-btn" style="flex: 1; text-align: center; font-size: 13px;">💻 View Code</a>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://termux-blog-g.blogspot.com/search/label/Linux" target="_blank" class="secondary-btn">🌐 View All Articles on Blogger</a>
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
                        <h3>🚲 Hob
                    <div class="card">
                        <h3>💼 Meus Serviços</h3>
                        <p>Para praticar e ganhar dinheiro extra, ofereço serviços freelance de <b>criação de Back-end e Servidores</b> com interface visual para projetos pessoais. Gosto muito de ajudar a tirar ideias do papel como um hobby remunerado!</p>
                    </div>

                    <div class="card">
                        <h3>🚲 Hobbies & Vida Pessoal</h3>
                        <p>No meu tempo livre, quando não estou programando novos projetos (como este portfólio), gosto de sair para passear com minha namorada, dar uma volta de <b>E-Roller (patinete elétrico)</b> ou andar de bicicleta pela natureza.</p>
                    </div>

                    <div class="card architecture-card">
                        <h3>⚙️ Curiosidade: Como funciona a API do Contato?</h3>
                        <p>Para receber mensagens no formulário de contato, eu não uso serviços prontos de terceiros. Eu criei minha própria <b>API RESTful usando Python (Flask)</b>. Ela roda de forma robusta e altamente escalável em servidores serverless no <b>Google Cloud Run</b>! 🚀</p>
                        <p>A API recebe os dados de forma segura, salva na nuvem em uma planilha de banco de dados do <b>Google Sheets</b> de maneira assíncrona, e me envia um alerta detalhado via e-mail corporativo. Além disso, se por acaso você perder a internet no seu navegador durante o envio, este site possui uma <b>Fila Offline</b> inteligente que guarda sua mensagem em cache local e faz a entrega de forma invisível assim que a conexão se restabelecer. Engenharia de ponta desenvolvida por mim!</p>
                    </div>
                </div>
            </div>
        `,
        blog: `
            <div class="about-section fade-in">
                <h1 class="title-center">Blog & Artigos</h1>
                <p class="subtitle" style="text-align: center; margin-bottom: 30px;">Escrevo sobre Linux, servidores e automação no meu blog no Blogger.</p>
                <div class="about-grid">
                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEikmGf2DgiXIFtW8hHJ2rHcDEBnu6c6toUhv2xhigMfUNCH0MyA9QiVnwlvYXtY5ysQdpcpPBhyxXgo9ITRXGsSaLofiijNh-YYH9FcZdsQ9kz8qau2zj7RClq2FugQhgsRivY8B4jwqxHk6m6t9riHZoRctsPirm9HMty_OhC6wiRqJQ5SMyOdKm5VIC8=w800" alt="Termux Ultra Edition" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>🚀 Termux ULTRA EDITION 2026: O Setup Definitivo para Android</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 Março 2026 · 🏷️ Linux</p>
                        <p>Transforme seu Termux em uma estação de trabalho de elite! Script de automação que instala Python, Node.js, PHP, servidor SSH, ambiente gráfico X11 e muito mais.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>Termux</span>
                            <span>Linux</span>
                            <span>Python</span>
                            <span>Node.js</span>
                            <span>SSH</span>
                        </div>
                        <a href="https://termux-blog-g.blogspot.com/2026/03/termux-ultra-edition-2026-o-setup.html" target="_blank" class="primary-btn" style="margin-top: 10px; display: inline-block;">Ler Artigo Completo</a>
                    </div>
                    
                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMiMzFjq16-kV8FJGTdwEwgYkR8WkUU6aWPZUp4beP29LWQpfhAZL8QtMAEQFb7NKw43V7089bv2u23eScHNCL4wtNXYvEuTw7EQ_26lobVXX9v0R-rNb2X-TaZPWhaJJZYzYJkJNAPcmMp54WSoGnYiLOXPLMLDAWkJORMNwyxvXnKfiu9yWGG7bjllo/w320-h189-rw/Captura%20de%20tela%202026-05-20%20082602.png" alt="Nexus Downloader" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>💚 Nexus Downloader: Interface para yt-dlp em C#</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 Maio 2026 · 🏷️ Automação</p>
                        <p>Baixe vídeos ou extraia áudios de qualquer site sem terminais complexos! Layout Escuro moderno, instalador automático do yt-dlp e barra de progresso em tempo real.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>C#</span>
                            <span>Windows Forms</span>
                            <span>yt-dlp</span>
                            <span>Automação</span>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                            <a href="https://termux-blog-g.blogspot.com/2026/05/nexus-downloader.html" target="_blank" class="primary-btn" style="flex: 1; text-align: center; font-size: 13px;">📖 Ler no Blog</a>
                            <a href="https://github.com/GabrielDaSilva17/Nuxus-Downloader" target="_blank" class="secondary-btn" style="flex: 1; text-align: center; font-size: 13px;">💻 Ver Código</a>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://termux-blog-g.blogspot.com/search/label/Linux" target="_blank" class="secondary-btn">🌐 Ver Todos os Artigos no Blogger</a>
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

                    <div class="card architecture-card">
                        <h3>⚙️ Behind the Scenes: The Contact API</h3>
                        <p>I don't use ready-made third-party services to handle the contact form. I built my own <b>RESTful API using Python (Flask)</b>. It runs securely and highly scalably on serverless servers in <b>Google Cloud Run</b>! 🚀</p>
                        <p>The API receives your message data safely, saves it asynchronously into a cloud spreadsheet database in <b>Google Sheets</b>, and sends me a formatted notification via corporate e-mail. Furthermore, if you lose your internet connection while sending, this website features an intelligent <b>Offline Queue</b> that caches your message locally and automatically submits it the instant you are back online. Custom high-performance engineering!</p>
                    </div>
                </div>
            </div>
        `,
        blog: `
            <div class="about-section fade-in">
                <h1 class="title-center">Blog & Articles</h1>
                <p class="subtitle" style="text-align: center; margin-bottom: 30px;">I write about Linux, servers and automation on my Blogger blog.</p>
                <div class="about-grid">
                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEikmGf2DgiXIFtW8hHJ2rHcDEBnu6c6toUhv2xhigMfUNCH0MyA9QiVnwlvYXtY5ysQdpcpPBhyxXgo9ITRXGsSaLofiijNh-YYH9FcZdsQ9kz8qau2zj7RClq2FugQhgsRivY8B4jwqxHk6m6t9riHZoRctsPirm9HMty_OhC6wiRqJQ5SMyOdKm5VIC8=w800" alt="Termux Ultra Edition" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>🚀 Termux ULTRA EDITION 2026: The Ultimate Setup for Android</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 March 2026 · 🏷️ Linux</p>
                        <p>Transform your Termux into an elite workstation! An automation script that installs Python, Node.js, PHP, SSH server, X11 graphical environment and much more.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>Termux</span>
                            <span>Linux</span>
                            <span>Python</span>
                            <span>Node.js</span>
                            <span>SSH</span>
                        </div>
                        <a href="https://termux-blog-g.blogspot.com/2026/03/termux-ultra-edition-2026-o-setup.html" target="_blank" class="primary-btn" style="margin-top: 10px; display: inline-block;">Read Full Article</a>
                    </div>

                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMiMzFjq16-kV8FJGTdwEwgYkR8WkUU6aWPZUp4beP29LWQpfhAZL8QtMAEQFb7NKw43V7089bv2u23eScHNCL4wtNXYvEuTw7EQ_26lobVXX9v0R-rNb2X-TaZPWhaJJZYzYJkJNAPcmMp54WSoGnYiLOXPLMLDAWkJORMNwyxvXnKfiu9yWGG7bjllo/w320-h189-rw/Captura%20de%20tela%202026-05-20%20082602.png" alt="Nexus Downloader" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>💚 Nexus Downloader: C# GUI for yt-dlp</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 May 2026 · 🏷️ Automation</p>
                        <p>Download video or extract high-quality audio without command terminals! Modern Dark theme, automatic background yt-dlp downloader, and fluid UI process mapping.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>C#</span>
                            <span>Windows Forms</span>
                            <span>yt-dlp</span>
                            <span>Automation</span>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                            <a href="https://termux-blog-g.blogspot.com/2026/05/nexus-downloader.html" target="_blank" class="primary-btn" style="flex: 1; text-align: center; font-size: 13px;">📖 Read on Blog</a>
                            <a href="https://github.com/GabrielDaSilva17/Nuxus-Downloader" target="_blank" class="secondary-btn" style="flex: 1; text-align: center; font-size: 13px;">💻 View Code</a>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://termux-blog-g.blogspot.com/search/label/Linux" target="_blank" class="secondary-btn">🌐 View All Articles on Blogger</a>
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
                        <h3>🚲 Hobb                        </div>
                        <a href="https://termux-blog-g.blogspot.com/2026/03/termux-ultra-edition-2026-o-setup.html" target="_blank" class="primary-btn" style="margin-top: 10px; display: inline-block;">Ler Artigo Completo</a>
                    </div>
                    
                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMiMzFjq16-kV8FJGTdwEwgYkR8WkUU6aWPZUp4beP29LWQpfhAZL8QtMAEQFb7NKw43V7089bv2u23eScHNCL4wtNXYvEuTw7EQ_26lobVXX9v0R-rNb2X-TaZPWhaJJZYzYJkJNAPcmMp54WSoGnYiLOXPLMLDAWkJORMNwyxvXnKfiu9yWGG7bjllo/w320-h189-rw/Captura%20de%20tela%202026-05-20%20082602.png" alt="Nexus Downloader" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>💚 Nexus Downloader: Interface para yt-dlp em C#</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 Maio 2026 · 🏷️ Automação</p>
                        <p>Baixe vídeos ou extraia áudios de qualquer site sem terminais complexos! Layout Escuro moderno, instalador automático do yt-dlp e barra de progresso em tempo real.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>C#</span>
                            <span>Windows Forms</span>
                            <span>yt-dlp</span>
                            <span>Automação</span>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                            <a href="https://termux-blog-g.blogspot.com/2026/05/nexus-downloader.html" target="_blank" class="primary-btn" style="flex: 1; text-align: center; font-size: 13px;">📖 Ler no Blog</a>
                            <a href="https://github.com/GabrielDaSilva17/Nuxus-Downloader" target="_blank" class="secondary-btn" style="flex: 1; text-align: center; font-size: 13px;">💻 Ver Código</a>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://termux-blog-g.blogspot.com/search/label/Linux" target="_blank" class="secondary-btn">🌐 Ver Todos os Artigos no Blogger</a>
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

                    <div class="card architecture-card">
                        <h3>⚙️ Behind the Scenes: The Contact API</h3>
                        <p>I don't use ready-made third-party services to handle the contact form. I built my own <b>RESTful API using Python (Flask)</b>. It runs 24/7 on a Linux server configured on a <b>Tablet</b> in my own home! 🚀</p>
                        <p>The API receives the data, stores it in a local database (<b>SQLite</b>), prevents spam using <i>Rate Limiting</i>, and automatically sends me an email via SMTP. Furthermore, if my home server temporarily loses connection, this website features a smart <b>Offline Queue</b> that saves your message and automatically resends it once the system is back online. A complete end-to-end architecture built 100% by me!</p>
                    </div>
                </div>
            </div>
        `,
        blog: `
            <div class="about-section fade-in">
                <h1 class="title-center">Blog & Articles</h1>
                <p class="subtitle" style="text-align: center; margin-bottom: 30px;">I write about Linux, servers and automation on my Blogger blog.</p>
                <div class="about-grid">
                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEikmGf2DgiXIFtW8hHJ2rHcDEBnu6c6toUhv2xhigMfUNCH0MyA9QiVnwlvYXtY5ysQdpcpPBhyxXgo9ITRXGsSaLofiijNh-YYH9FcZdsQ9kz8qau2zj7RClq2FugQhgsRivY8B4jwqxHk6m6t9riHZoRctsPirm9HMty_OhC6wiRqJQ5SMyOdKm5VIC8=w800" alt="Termux Ultra Edition" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>🚀 Termux ULTRA EDITION 2026: The Ultimate Setup for Android</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 March 2026 · 🏷️ Linux</p>
                        <p>Transform your Termux into an elite workstation! An automation script that installs Python, Node.js, PHP, SSH server, X11 graphical environment and much more.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>Termux</span>
                            <span>Linux</span>
                            <span>Python</span>
                            <span>Node.js</span>
                            <span>SSH</span>
                        </div>
                        <a href="https://termux-blog-g.blogspot.com/2026/03/termux-ultra-edition-2026-o-setup.html" target="_blank" class="primary-btn" style="margin-top: 10px; display: inline-block;">Read Full Article</a>
                    </div>

                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMiMzFjq16-kV8FJGTdwEwgYkR8WkUU6aWPZUp4beP29LWQpfhAZL8QtMAEQFb7NKw43V7089bv2u23eScHNCL4wtNXYvEuTw7EQ_26lobVXX9v0R-rNb2X-TaZPWhaJJZYzYJkJNAPcmMp54WSoGnYiLOXPLMLDAWkJORMNwyxvXnKfiu9yWGG7bjllo/w320-h189-rw/Captura%20de%20tela%202026-05-20%20082602.png" alt="Nexus Downloader" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>💚 Nexus Downloader: C# GUI for yt-dlp</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 May 2026 · 🏷️ Automation</p>
                        <p>Download video or extract high-quality audio without command terminals! Modern Dark theme, automatic background yt-dlp downloader, and fluid UI process mapping.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>C#</span>
                            <span>Windows Forms</span>
                            <span>yt-dlp</span>
                            <span>Automation</span>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                            <a href="https://termux-blog-g.blogspot.com/2026/05/nexus-downloader.html" target="_blank" class="primary-btn" style="flex: 1; text-align: center; font-size: 13px;">📖 Read on Blog</a>
                            <a href="https://github.com/GabrielDaSilva17/Nuxus-Downloader" target="_blank" class="secondary-btn" style="flex: 1; text-align: center; font-size: 13px;">💻 View Code</a>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://termux-blog-g.blogspot.com/search/label/Linux" target="_blank" class="secondary-btn">🌐 View All Articles on Blogger</a>
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
                        <p>In meiner Freizeit, wenn ich não gerade neue Projekte (wie dieses Portfolio) programmiere, gehe ich gerne mit meiner Freundin spazieren, fahre mit meinem <b>E-Roller</b> oder fahre mit dem Fahrrad durch die Natur.</p>
                    </div>

                    <div class="card architecture-card">
                        <h3>⚙️ Hinter den Kulissen: Die Kontakt-API</h3>
                        <p>Ich verwende keine vorgefertigten Drittanbieter-Dienste für das Kontaktformular. Ich habe meine eigene <b>RESTful-API mit Python (Flask)</b> entwickelt. Sie läuft rund um die Uhr auf einem Linux-Server, der auf einem <b>Tablet</b> bei mir zu Hause konfiguriert ist! 🚀</p>
                        <p>The API recebe os dados, salva em um banco de dados local (<b>SQLite</b>), verifica se há spam usando <i>Rate Limiting</i>, e me dispara um e-mail automaticamente via SMTP. Além disso, se o meu servidor caseiro reiniciar ou perder a internet, este site possui uma <b>Fila Offline</b> inteligente que salva sua mensagem e envia de forma automática assim que o sistema voltar ao ar. Eine komplette, zu 100% von mir erstellte End-to-End-Architektur!</p>
                    </div>
                </div>
            </div>
        `,
        blog: `
            <div class="about-section fade-in">
                <h1 class="title-center">Blog & Artikel</h1>
                <p class="subtitle" style="text-align: center; margin-bottom: 30px;">Ich schreibe über Linux, Server und Automatisierung in meinem Blogger-Blog.</p>
                <div class="about-grid">
                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEikmGf2DgiXIFtW8hHJ2rHcDEBnu6c6toUhv2xhigMfUNCH0MyA9QiVnwlvYXtY5ysQdpcpPBhyxXgo9ITRXGsSaLofiijNh-YYH9FcZdsQ9kz8qau2zj7RClq2FugQhgsRivY8B4jwqxHk6m6t9riHZoRctsPirm9HMty_OhC6wiRqJQ5SMyOdKm5VIC8=w800" alt="Termux Ultra Edition" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>🚀 Termux ULTRA EDITION 2026: Das ultimative Setup für Android</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 März 2026 · 🏷️ Linux</p>
                        <p>Verwandeln Sie Ihr Termux in eine Elite-Workstation! Ein Automatisierungsskript, das Python, Node.js, PHP, SSH-Server, X11-Grafikumgebung und vieles mehr installiert.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>Termux</span>
                            <span>Linux</span>
                            <span>Python</span>
                            <span>Node.js</span>
                            <span>SSH</span>
                        </div>
                        <a href="https://termux-blog-g.blogspot.com/2026/03/termux-ultra-edition-2026-o-setup.html" target="_blank" class="primary-btn" style="margin-top: 10px; display: inline-block;">Vollständigen Artikel lesen</a>
                    </div>

                    <div class="card blog-card">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMiMzFjq16-kV8FJGTdwEwgYkR8WkUU6aWPZUp4beP29LWQpfhAZL8QtMAEQFb7NKw43V7089bv2u23eScHNCL4wtNXYvEuTw7EQ_26lobVXX9v0R-rNb2X-TaZPWhaJJZYzYJkJNAPcmMp54WSoGnYiLOXPLMLDAWkJORMNwyxvXnKfiu9yWGG7bjllo/w320-h189-rw/Captura%20de%20tela%202026-05-20%20082602.png" alt="Nexus Downloader" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <h3>💚 Nexus Downloader: C# GUI für yt-dlp</h3>
                        <p style="margin-bottom: 10px; color: var(--text-secondary); font-size: 13px;">📅 Mai 2026 · 🏷️ Automatisierung</p>
                        <p>Videos herunterladen oder Audios extrahieren, ganz ohne komplizierte Befehle! Moderner Dark-Modus, automatischer yt-dlp Setup-Mechanismus und Live-Fortschrittsanzeige.</p>
                        <div class="skills-tags" style="margin: 15px 0;">
                            <span>C#</span>
                            <span>Windows Forms</span>
                            <span>yt-dlp</span>
                            <span>Automatisierung</span>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                            <a href="https://termux-blog-g.blogspot.com/2026/05/nexus-downloader.html" target="_blank" class="primary-btn" style="flex: 1; text-align: center; font-size: 13px;">📖 Im Blog lesen</a>
                            <a href="https://github.com/GabrielDaSilva17/Nuxus-Downloader" target="_blank" class="secondary-btn" style="flex: 1; text-align: center; font-size: 13px;">💻 Code ansehen</a>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://termux-blog-g.blogspot.com/search/label/Linux" target="_blank" class="secondary-btn">🌐 Alle Artikel auf Blogger ansehen</a>
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
        nav_blog: "Blog",
        nav_contact: "Contato",
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
        footer_text: "© 2026 Gabriel da Silva. Gemacht mit",
        sending: "Senden...",
        sent: "Nachricht gesendet!",
        error: "Fehler beim Senden",
        send_btn: "Nachricht Senden",
        offline_saved: "Server offline. Nachricht in Warteschlange gespeichert!",
        queue_processing: "Warteschlange wird verarbeitet..."
    }
};

export { translations, i18n_strings };
