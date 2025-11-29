// script.js (versão corrigida e defensiva)
// - não sobrescreve window.estruturaEventos se já existir
// - tenta carregar ./estruturaEventos.json antes de usar fallback
// - exibe fotoTurma se fornecida

const IMAGEM_PADRAO = ''; // coloque uma URL padrão se quiser

function gerarIdUnico(nome, ano) {
  return (ano + '-' + nome).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

// Se já existe um estruturaEventos definido globalmente (por outro script), usa ele.
// Caso contrário, vamos tentar carregar de um JSON externo e depois cair em fallback.
async function obterEstruturaEventos() {
  if (window.estruturaEventos && Array.isArray(window.estruturaEventos)) {
    return window.estruturaEventos;
  }

  // tenta carregar um JSON externo (opcional). Se não existir, cai no fallback.
  const caminhosPossiveis = [
    './estruturaEventos.json',
    './dados/estruturaEventos.json',
    './data/estruturaEventos.json',
    './estruturaeventos.json'
  ];

  for (const caminho of caminhosPossiveis) {
    try {
      const resp = await fetch(caminho, { cache: 'no-store' });
      if (resp.ok) {
        const dados = await resp.json();
        // marca no window para possíveis usos futuros
        window.estruturaEventos = dados;
        return dados;
      }
    } catch (err) {
      // ignora e continua tentando outros caminhos
    }
  }

  // Fallback: dados de exemplo (somente para garantir que a UI funcione).
  // Substitua por seus dados reais ou, preferencialmente, adicione um arquivo JSON no repositório.
  const fallback = [
    {
      ano: "1º Ano A",
      professorResponsavel: "Antonio Flavio",
      descricao: "Exploração da área de Jogos Digitais.",
      fotoTurma: IMAGEM_PADRAO,
      projetos: [
        { tipo: "video", nome: "Projeto de Jogos: Apresentação", professor: "Prof. Antônio Flávio", youtubeID: "dQw4w9WgXcQ", idUnico: gerarIdUnico("video-jogos","1A") },
        { tipo: "wiki", nome: "Wiki do Curso: Jogos Digitais", professor: "Prof. Antônio Flávio", idUnico: gerarIdUnico("wiki-jogos","1A"), wikiContent: "<h3>Ementa</h3><p>Exemplo...</p>" }
      ]
    },
    {
      ano: "2º Ano A",
      professorResponsavel: "Aroldo",
      descricao: "Informática para Web",
      fotoTurma: IMAGEM_PADRAO,
      projetos: [
        { tipo: "video", nome: "Projeto Web: Frontend", professor: "Prof. Aroldo", youtubeID: "dQw4w9WgXcQ", idUnico: gerarIdUnico("video-front","2A") },
        { tipo: "wiki", nome: "Wiki: Web Design", professor: "Prof. Aroldo", idUnico: gerarIdUnico("wiki-web","2A"), wikiContent: "<p>Conteúdo exemplo</p>" }
      ]
    }
    // remova este fallback quando tiver seus dados reais
  ];

  window.estruturaEventos = fallback;
  return fallback;
}

function encontrarProjetoPorId(idDesejado, estrutura = window.estruturaEventos || []) {
  for (const secao of estrutura) {
    const projetoEncontrado = (secao.projetos || []).find(p => p.idUnico === idDesejado);
    if (projetoEncontrado) return projetoEncontrado;

    // procura em subGuias, se existir
    for (const projeto of (secao.projetos || [])) {
      if (projeto.subGuias && Array.isArray(projeto.subGuias)) {
        for (const sub of projeto.subGuias) {
          const encontrado = (sub.projetos || []).find(p => p.idUnico === idDesejado);
          if (encontrado) return encontrado;
        }
      }
    }
  }
  return null;
}

function criarCardProjeto(projeto) {
  const card = document.createElement('div');
  card.className = 'sala-card';
  card.setAttribute('data-id-projeto', projeto.idUnico || '');
  card.setAttribute('data-tipo', projeto.tipo || '');

  const tituloCard = document.createElement('h3');
  tituloCard.textContent = projeto.nome || 'Projeto';
  card.appendChild(tituloCard);

  const profCard = document.createElement('p');
  profCard.textContent = `Professor(a): ${projeto.professor || ''}`;
  card.appendChild(profCard);

  const btn = document.createElement('button');
  if (projeto.tipo === 'video') {
    btn.textContent = 'ASSISTIR VÍDEO';
    btn.addEventListener('click', (e) => { e.stopPropagation(); abrirModalVideoPorId(projeto.idUnico); });
  } else if (projeto.tipo === 'wiki') {
    btn.textContent = 'VER WIKI';
    btn.addEventListener('click', (e) => { e.stopPropagation(); abrirModalWikiPorId(projeto.idUnico); });
  } else if (projeto.tipo === 'guia-principal') {
    btn.textContent = 'ABRIR GUIA';
    btn.addEventListener('click', (e) => { e.stopPropagation(); /* implementar se necessário */ });
  } else {
    btn.textContent = 'ABRIR';
  }
  card.appendChild(btn);

  return card;
}

function renderizarSecao(secao) {
  const secaoDiv = document.createElement('div');
  secaoDiv.className = 'secao-ano';

  const titulo = document.createElement('h2');
  titulo.textContent = secao.ano || 'Ano';
  secaoDiv.appendChild(titulo);

  // Foto da turma (se existir)
  if (secao.fotoTurma || IMAGEM_PADRAO) {
    const img = document.createElement('img');
    img.src = secao.fotoTurma || IMAGEM_PADRAO;
    img.alt = `${secao.ano || 'Turma'} - foto`;
    img.style.maxWidth = '100%';
    img.style.borderRadius = '8px';
    img.style.objectFit = 'cover';
    img.style.height = '120px';
    secaoDiv.appendChild(img);
  }

  const desc = document.createElement('p');
  desc.innerHTML = secao.descricao || '';
  secaoDiv.appendChild(desc);

  const prof = document.createElement('p');
  prof.className = 'professor-responsavel';
  prof.textContent = `Professor Responsável: ${secao.professorResponsavel || ''}`;
  secaoDiv.appendChild(prof);

  // Container de cards
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-container';
  (secao.projetos || []).forEach(projeto => {
    const card = criarCardProjeto(projeto);
    cardsContainer.appendChild(card);
  });

  secaoDiv.appendChild(cardsContainer);
  return secaoDiv;
}

function gerarListaDeSalasNaPagina(data, containerId = 'container-salas') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  // atualiza header (opcional)
  const headerH1 = document.querySelector('header h1');
  const headerP = document.querySelector('header p');
  if (headerH1) headerH1.textContent = "CETI Padre Antônio José do Rego";
  if (headerP) headerP.textContent = "Seja bem-vindo(a) ao Dia D da EPT!";

  data.forEach(secao => {
    const secaoNode = renderizarSecao(secao);
    container.appendChild(secaoNode);
  });
}

function adicionarFiltro() {
  const input = document.getElementById('input-pesquisa');
  if (!input) return;
  input.addEventListener('input', function () {
    const filtro = this.value.toLowerCase();
    const secoes = document.querySelectorAll('.secao-ano');
    secoes.forEach(secao => {
      let visivel = false;
      const textoSecao = secao.textContent.toLowerCase();
      if (textoSecao.includes(filtro)) visivel = true;
      secao.querySelectorAll('.sala-card').forEach(card => {
        const textoCard = card.textContent.toLowerCase();
        if (textoCard.includes(filtro)) {
          card.style.display = 'block';
          visivel = true;
        } else {
          card.style.display = 'none';
        }
      });
      secao.style.display = (visivel || filtro === '') ? 'flex' : 'none';
    });
  });
}

function abrirModalVideoPorId(idProjeto) {
  const projeto = encontrarProjetoPorId(idProjeto);
  if (!projeto || !projeto.youtubeID) {
    alert('Vídeo não disponível para este projeto.');
    return;
  }
  const modal = document.getElementById('modal-video');
  const videoContainer = document.getElementById('video-embed-container');
  if (!modal || !videoContainer) return;

  videoContainer.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.width = "100%";
  iframe.height = "400";
  iframe.src = `https://www.youtube.com/embed/${projeto.youtubeID}`;
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.allowFullscreen = true;

  videoContainer.appendChild(iframe);
  modal.style.display = 'flex';
}

function fecharModalVideo() {
  const modal = document.getElementById('modal-video');
  const videoContainer = document.getElementById('video-embed-container');
  if (videoContainer) videoContainer.innerHTML = '';
  if (modal) modal.style.display = 'none';
}

function abrirModalWikiPorId(idProjeto) {
  const projeto = encontrarProjetoPorId(idProjeto);
  if (!projeto || !projeto.wikiContent) {
    alert('Conteúdo da Wiki não disponível.');
    return;
  }
  // redireciona para wiki.html com query, conforme seu fluxo
  window.location.href = `wiki.html?id=${idProjeto}`;
}

// Inicialização principal
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const dados = await obterEstruturaEventos();
    // garante que a variável global window.estruturaEventos exista
    window.estruturaEventos = dados;

    gerarListaDeSalasNaPagina(dados);
    adicionarFiltro();

    const fecharBtn = document.getElementById('fechar-modal-video');
    if (fecharBtn) fecharBtn.addEventListener('click', fecharModalVideo);
    window.addEventListener('click', (event) => {
      const modal = document.getElementById('modal-video');
      if (modal && event.target === modal) fecharModalVideo();
    });
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') fecharModalVideo();
    });
  } catch (err) {
    console.error('Erro ao inicializar a interface:', err);
  }
});