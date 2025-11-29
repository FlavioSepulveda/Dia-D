// --- 1. Base de Dados: Estrutura hierárquica por Ano/Turma ---

const IMAGEM_PADRAO = 'URL_DA_SUA_FOTO_PADRAO_AQUI.jpg'; 

// Função auxiliar para criar um ID único e consistente (MANTIDA)
function gerarIdUnico(nome, ano) {
    return (ano + '-' + nome).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

const estruturaEventos = [
    // --- 1º ANO A: JOGOS DIGITAIS ---
    {
        ano: "1º Ano A",
        professorResponsavel: "Antonio Flavio", 
        fotoTurma: IMAGEM_PADRAO,
        descricao: "Exploração de projetos e conceitos relacionados à área de **Jogos Digitais**.",
        projetos: [
            { tipo: "video", nome: "Projeto de Jogos: Apresentação", professor: "Prof. Antônio Flávio", youtubeID: "ID_VIDEO_1A_JOGOS", idUnico: gerarIdUnico("video-jogos", "1A") },
            { tipo: "wiki", nome: "Wiki do Curso: Jogos Digitais", professor: "Prof. Antônio Flávio", youtubeID: null, idUnico: gerarIdUnico("wiki-jogos", "1A"), 
                wikiContent: `
                    <h3>🎮 Ementa de Jogos Digitais</h3>
                    <p>A turma desenvolveu protótipos de jogos focados em narrativa e usabilidade. O projeto final foi um jogo 2D com temática de sustentabilidade.</p>
                    <h4>Tecnologias Utilizadas</h4>
                    <ul>
                        <li>Motor Unity.</li>
                        <li>Linguagem C#.</li>
                        <li>Design de Personagens (Pixel Art).</li>
                    </ul>
                    <p style="margin-top: 15px; color: var(--cor-acento);">**Conteúdo do 1º A** - Substitua este HTML pelo texto real da Wiki.</p>
                `
            } 
        ]
    },
    // --- 1º ANO B: MARKETING DIGITAL ---
    {
        ano: "1º Ano B",
        professorResponsavel: "Ananda", 
        fotoTurma: IMAGEM_PADRAO,
        descricao: "Exploração de projetos e conceitos relacionados à área de **Marketing Digital**.",
        projetos: [
            { tipo: "video", nome: "Projeto de Marketing: Apresentação", professor: "Prof. Ananda", youtubeID: "ID_VIDEO_1B_MARKETING", idUnico: gerarIdUnico("video-marketing", "1B") },
            { tipo: "wiki", nome: "Wiki do Curso: Marketing Digital", professor: "Prof. Ananda", youtubeID: null, idUnico: gerarIdUnico("wiki-marketing", "1B"),
                wikiContent: `
                    <h3>📈 Estratégias Digitais</h3>
                    <p>Foco na criação de campanhas de tráfego pago e orgânico. O projeto incluiu a criação de uma persona de cliente e um funil de vendas completo.</p>
                    <h4>Tópicos Chave</h4>
                    <ul>
                        <li>SEO (Otimização para Busca).</li>
                        <li>Análise de Métricas (ROI).</li>
                        <li>Copywriting.</li>
                    </ul>
                    <p style="margin-top: 15px; color: var(--cor-acento);">**Conteúdo do 1º B** - Substitua este HTML pelo texto real da Wiki.</p>
                `
            }
        ]
    },
    // --- 2º ANO A: INFORMÁTICA PARA WEB ---
    {
        ano: "2º Ano A",
        professorResponsavel: "Aroldo", 
        fotoTurma: IMAGEM_PADRAO,
        descricao: "Exploração de projetos e conceitos relacionados à área de **Informática para Web**.",
        projetos: [
            { tipo: "video", nome: "Projeto Web: Frontend e Design", professor: "Prof. Aroldo", youtubeID: "ID_VIDEO_2A_WEB_FRONT", idUnico: gerarIdUnico("video-front", "2A") },
            { tipo: "wiki", nome: "Wiki do Curso: Web Design", professor: "Prof. Aroldo", youtubeID: null, idUnico: gerarIdUnico("wiki-web", "2A"),
                wikiContent: `
                    <h3>🌐 Design e Responsividade</h3>
                    <p>Os alunos trabalharam na parte visual e de interação dos websites, garantindo que o design fosse responsivo (funcionasse em celulares) e acessível.</p>
                    <h4>Tecnologias Utilizadas</h4>
                    <ul>
                        <li>HTML5 e CSS3.</li>
                        <li>Frameworks como Bootstrap.</li>
                    </ul>
                    <p style="margin-top: 15px; color: var(--cor-acento);">**Conteúdo do 2º A** - Substitua este HTML pelo texto real da Wiki.</p>
                `
            }
        ]
    },
    // --- 2º ANO B: INFORMÁTICA PARA WEB ---
    {
        ano: "2º Ano B",
        professorResponsavel: "Edkleverson", 
        fotoTurma: IMAGEM_PADRAO,
        descricao: "Exploração de projetos e conceitos relacionados à área de **Informática para Web**.",
        projetos: [
            { tipo: "video", nome: "Projeto Web: Backend e Banco de Dados", professor: "Prof. Edkleverson", youtubeID: "ID_VIDEO_2B_WEB_BACK", idUnico: gerarIdUnico("video-back", "2B") },
            { tipo: "wiki", nome: "Wiki do Curso: Programação Web", professor: "Prof. Edkleverson", youtubeID: null, idUnico: gerarIdUnico("wiki-prog", "2B"),
                wikiContent: `
                    <h3>⚙️ Servidores e Banco de Dados</h3>
                    <p>Foco na lógica de negócios, segurança e manipulação de dados em aplicações web. O projeto final foi um sistema de cadastro e login funcional.</p>
                    <h4>Tecnologias Utilizadas</h4>
                    <ul>
                        <li>Linguagem Node.js.</li>
                        <li>Banco de Dados SQL.</li>
                    </ul>
                    <p style="margin-top: 15px; color: var(--cor-acento);">**Conteúdo do 2º B** - Substitua este HTML pelo texto real da Wiki.</p>
                `
            }
        ]
    },
    // --- 3º ANO: INTELIGÊNCIA ARTIFICIAL (GUIA) ---
    {
        ano: "3º Ano - Inteligência Artificial",
        professorResponsavel: "Fabiana", 
        fotoTurma: IMAGEM_PADRAO,
        descricao: "O 3º ano apresenta um guia de projetos avançados focados em **Inteligência Artificial**. Clique para explorar as três salas temáticas (A, B e C).",
        projetos: [
            { 
                tipo: "guia-principal", 
                nome: "Abrir Guia de Salas de Inteligência Artificial", 
                professor: "Prof. Fabiana", 
                youtubeID: null,
                idUnico: gerarIdUnico("guia-principal-ia", "3"),
                subGuias: [
                    { 
                        nome: "Sala 3º A: Machine Learning", 
                        professor: "Prof. Fabiana", 
                        projetos: [
                            { tipo: "video", nome: "Vídeo Apresentação (ML)", professor: "Prof. Fabiana", youtubeID: "ID_VIDEO_3A_ML", idUnico: gerarIdUnico("video-ml", "3A") },
                            { tipo: "wiki", nome: "Wiki do Projeto (ML)", professor: "Prof. Fabiana", youtubeID: null, idUnico: gerarIdUnico("wiki-ml", "3A"),
                                wikiContent: `
                                    <h3>🤖 Machine Learning (Aprendizado de Máquina)</h3>
                                    <p>Estudo de algoritmos que permitem aos computadores aprender com dados para fazer previsões ou decisões.</p>
                                    <p style="margin-top: 15px; color: var(--cor-acento);">**Conteúdo do 3º A (ML)** - Substitua este HTML pelo texto real da Wiki.</p>
                                `
                            }
                        ]
                    },
                    { 
                        nome: "Sala 3º B: Visão Computacional", 
                        professor: "Prof. Fabiana", 
                        projetos: [
                            { tipo: "video", nome: "Vídeo Apresentação (VC)", professor: "Prof. Fabiana", youtubeID: "ID_VIDEO_3B_VC", idUnico: gerarIdUnico("video-vc", "3B") },
                            { tipo: "wiki", nome: "Wiki do Projeto (VC)", professor: "Prof. Fabiana", youtubeID: null, idUnico: gerarIdUnico("wiki-vc", "3B"),
                                wikiContent: `
                                    <h3>👁️ Visão Computacional</h3>
                                    <p>Desenvolvimento de sistemas capazes de processar, analisar e entender imagens digitais e vídeos. Aplicações em robótica e segurança.</p>
                                    <p style="margin-top: 15px; color: var(--cor-acento);">**Conteúdo do 3º B (VC)** - Substitua este HTML pelo texto real da Wiki.</p>
                                `
                            }
                        ]
                    },
                    { 
                        nome: "Sala 3º C: Processamento de Linguagem Natural", 
                        professor: "Prof. Fabiana", 
                        projetos: [
                            { tipo: "video", nome: "Vídeo Apresentação (PLN)", professor: "Prof. Fabiana", youtubeID: "ID_VIDEO_3C_PLN", idUnico: gerarIdUnico("video-pln", "3C") },
                            { tipo: "wiki", nome: "Wiki do Projeto (PLN)", professor: "Prof. Fabiana", youtubeID: null, idUnico: gerarIdUnico("wiki-pln", "3C"),
                                wikiContent: `
                                    <h3>💬 Processamento de Linguagem Natural (PLN)</h3>
                                    <p>Estudo focado em como os computadores podem entender e gerar linguagem humana. Base para Chatbots e tradução automática.</p>
                                    <p style="margin-top: 15px; color: var(--cor-acento);">**Conteúdo do 3º C (PLN)** - Substitua este HTML pelo texto real da Wiki.</p>
                                `
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

// --- Função para buscar qualquer projeto por ID (Mantida) ---
function encontrarProjetoPorId(idDesejado, estrutura = estruturaEventos) {
    for (const secao of estrutura) {
        // 1. Verifica projetos diretos
        const projetoEncontrado = secao.projetos.find(p => p.idUnico === idDesejado);
        if (projetoEncontrado) return projetoEncontrado;

        // 2. Verifica projetos dentro de subGuias (3º ano)
        if (secao.projetos[0] && secao.projetos[0].subGuias) {
            for (const subGuia of secao.projetos[0].subGuias) {
                const subProjetoEncontrado = subGuia.projetos.find(p => p.idUnico === idDesejado);
                if (subProjetoEncontrado) return subProjetoEncontrado;
            }
        }
    }
    return null; 
}

// --- 2. Funções de Manipulação da Interface ---

// Função principal de renderização (LIMPA de listeners e Avaliação)
function gerarListaDeSalas(data, containerId = 'container-salas') {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 

    document.querySelector('header h1').textContent = "CETI Padre Antônio José do Rego";
    document.querySelector('header p').textContent = "Seja bem-vindo(a) ao Dia D da EPT!";

    data.forEach(secao => {
        const secaoDiv = document.createElement('div');
        secaoDiv.className = 'secao-ano';

        secaoDiv.innerHTML = `
            <div class="secao-header">
                <img src="${secao.fotoTurma}" alt="Foto da Turma ${secao.ano}" class="foto-turma">
                <div class="secao-info">
                    <h2>${secao.ano}</h2>
                    <p class="descricao-projeto">${secao.descricao}</p>
                    <p class="professor-responsavel">Professor Responsável: ${secao.professorResponsavel}</p>
                </div>
            </div>
            <div class="cards-container" id="cards-${secao.ano.replace(/\s/g, '-')}">
            </div>
        `;
        container.appendChild(secaoDiv);

        const cardsContainer = secaoDiv.querySelector('.cards-container');

        // Loop de criação dos cards
        secao.projetos.forEach(projeto => {
            const card = document.createElement('div');
            
            // Adicionamos classes de identificação para o Event Delegation
            card.setAttribute('data-id-projeto', projeto.idUnico); 
            card.setAttribute('data-tipo', projeto.tipo);

            if (projeto.tipo === "video") {
                card.className = 'sala-card video-card';
                card.innerHTML = `<h3>${projeto.nome}</h3><p>Professor(a): ${projeto.professor}</p><p style="margin-top: 5px; font-weight: bold;">📺 ASSISTIR VÍDEO</p>`;
                
            } else if (projeto.tipo === "wiki") {
                card.className = 'sala-card wiki-card';
                card.innerHTML = `<h3>${projeto.nome}</h3><p>Professor(a): ${projeto.professor}</p><p style="margin-top: 5px; font-weight: bold; color: var(--cor-principal);">📖 VER WIKI</p>`;
                
            } else if (projeto.tipo === "guia-principal") {
                card.className = 'sala-card video-card guia-btn'; // Adiciona classe guia-btn para distinguir
                card.innerHTML = `<h3>${projeto.nome}</h3><p>${projeto.professor}</p><p style="margin-top: 5px; font-weight: bold;">➡️ CLIQUE PARA ABRIR O GUIA</p>`;
                
                // O Listener do guia principal DEVE permanecer aqui, pois ele muda a estrutura.
                card.addEventListener('click', () => abrirSubGuia(secao));
            }
            
            // REMOVIDO: Adiciona o componente de avaliação
            /* if (projeto.tipo !== "guia-principal") {
                const avaliacaoDiv = renderizarAvaliacao(projeto.idUnico); 
                card.appendChild(avaliacaoDiv);
            } */

            cardsContainer.appendChild(card);
        });
    });
}

// REMOVIDO: Função renderizarAvaliacao()
// REMOVIDO: Função salvarAvaliacao()

// Função para o filtro em tempo real (mantida)
function adicionarFiltro() {
    const input = document.getElementById('input-pesquisa');
    
    input.addEventListener('keyup', function() {
        const filtro = this.value.toLowerCase();
        const secoes = document.querySelectorAll('.secao-ano');

        secoes.forEach(secao => {
            let visivel = false;
            const textoSecao = secao.textContent.toLowerCase();
            
            if (textoSecao.includes(filtro)) {
                visivel = true;
            }
            
            secao.querySelectorAll('.sala-card').forEach(card => {
                const textoCard = card.textContent.toLowerCase();
                if (textoCard.includes(filtro)) {
                    card.style.display = 'block'; 
                    visivel = true; 
                } else {
                    card.style.display = 'none'; 
                }
            });
            
            if (visivel || filtro === '') {
                secao.style.display = 'flex'; 
            } else {
                secao.style.display = 'none';
            }
        });
    });
}

// Funções de Modal
function abrirSubGuia(secao) {
    const containerPrincipal = document.getElementById('container-salas');
    containerPrincipal.innerHTML = ''; 

    const btnVoltar = document.createElement('button');
    btnVoltar.textContent = "⬅️ Voltar ao Guia Principal";
    btnVoltar.style.cssText = "padding: 10px 20px; background-color: #f0f0f0; border: none; border-radius: 5px; margin-bottom: 20px; cursor: pointer; color: #333;";
    btnVoltar.addEventListener('click', () => {
        // Redefine a lista principal de eventos
        gerarListaDeSalas(estruturaEventos); 
    });
    containerPrincipal.appendChild(btnVoltar);

    const dadosSubGuia = secao.projetos[0].subGuias.map(sub => ({
        ano: sub.nome, 
        professorResponsavel: sub.professor,
        fotoTurma: IMAGEM_PADRAO,
        descricao: `Assista à explicação do professor sobre o foco da sala: ${sub.professor}`,
        projetos: sub.projetos 
    }));
    
    gerarListaDeSalas(dadosSubGuia, 'container-salas');
}

// --- Funções de Abertura do Modal/Página por ID ---
function abrirModalVideoPorId(idProjeto) {
    const projeto = encontrarProjetoPorId(idProjeto);
    if (!projeto || !projeto.youtubeID) return;

    const modal = document.getElementById('modal');
    const titulo = document.getElementById('modal-titulo');
    const professor = document.getElementById('modal-professor');
    const videoContainer = document.getElementById('video-embed-container');
    
    titulo.textContent = projeto.nome;
    professor.textContent = `Professor(a): ${projeto.professor}`;
    
    const iframeHTML = `<iframe src="https://www.youtube.com/embed/${projeto.youtubeID}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    
    videoContainer.innerHTML = iframeHTML;
    modal.style.display = 'block';
}

// *************** CORREÇÃO DEFINITIVA (REDIRECIONAMENTO) ***************
function abrirModalWikiPorId(idProjeto) {
    const projeto = encontrarProjetoPorId(idProjeto);
    
    if (!projeto || !projeto.wikiContent) {
        alert("O conteúdo da Wiki para este projeto ainda não foi preenchido ou o projeto não foi encontrado.");
        return;
    }
    
    // REDIRECIONA o navegador para a nova página, passando o ID na query string
    window.location.href = `wiki.html?id=${idProjeto}`;
}
// ********************************************************************************

function fecharModalVideo() {
    const modal = document.getElementById('modal');
    const videoContainer = document.getElementById('video-embed-container');
    videoContainer.innerHTML = ''; 
    modal.style.display = 'none';
}

// REMOVIDO: Função fecharModalWiki() não é mais necessária já que o modal não existe.


// --- 3. Inicialização e Eventos de Fechamento ---

// Função que aplica a Delegação de Eventos (Ouvinte único para os cards)
function delegarEventosDeClique() {
    const container = document.getElementById('container-salas');
    
    // ANEXA APENAS UM LISTENER AO CONTÊINER PRINCIPAL
    container.addEventListener('click', (event) => {
        const card = event.target.closest('.sala-card');
        
        // Ignora cliques que não são em um cartão ou se for o botão do Guia Principal
        if (!card || card.classList.contains('guia-btn')) return;

        const idProjeto = card.getAttribute('data-id-projeto');
        const tipoAcao = card.getAttribute('data-tipo');

        if (tipoAcao === 'video') {
            abrirModalVideoPorId(idProjeto);
        } else if (tipoAcao === 'wiki') {
            // Chama a função que agora REDIRECIONA
            abrirModalWikiPorId(idProjeto);
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Garante que a renderização só ocorra na página inicial
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        gerarListaDeSalas(estruturaEventos); 
        adicionarFiltro(); 
        delegarEventosDeClique(); 
    }
    
    // Configuração dos eventos de fechamento (apenas para o modal de vídeo)
    const fecharModalBtn = document.querySelector('.fechar-modal');
    if (fecharModalBtn) fecharModalBtn.addEventListener('click', fecharModalVideo);
    
    window.addEventListener('click', (event) => {
        const modalVideo = document.getElementById('modal');
        if (modalVideo && event.target == modalVideo) {
            fecharModalVideo();
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            fecharModalVideo();
        }
    });
});