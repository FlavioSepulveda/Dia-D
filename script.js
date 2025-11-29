// script.js - versão compatível com o index.html acima

const IMAGEM_PADRAO = ''; // se quiser, coloca URL

function gerarIdUnico(nome, ano) {
  return (ano + '-' + nome).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

const estruturaEventos = [
  {
    ano: "1º Ano A",
    professorResponsavel: "Antonio Flavio",
    descricao: "Exploração da área de Jogos Digitais.",
    projetos: [
      { tipo: "video", nome: "Projeto de Jogos: Apresentação", professor: "Prof. Antônio Flávio", youtubeID: "ID_VIDEO_1A_JOGOS", idUnico: gerarIdUnico("video-jogos","1A") },
      { tipo: "wiki", nome: "Wiki do Curso: Jogos Digitais", professor: "Prof. Antônio Flávio", idUnico: gerarIdUnico("wiki-jogos","1A"), wikiContent: "<h3>Ementa</h3><p>Exemplo...</p>" }
    ]
  },
  {
    ano: "2º Ano A",
    professorResponsavel: "Aroldo",
    descricao: "Informática para Web",
    projetos: [
      { tipo: "video", nome: "Projeto Web: Frontend", professor: "Prof. Aroldo", youtubeID: "ID_VIDEO_2A_WEB_FRONT", idUnico: gerarIdUnico("video-front","2A") },
      { tipo: "wiki", nome: "Wiki: Web Design", professor: "Prof. Aroldo", idUnico: gerarIdUnico("wiki-web","2A"), wikiContent: "<p>Conteúdo exemplo</p>" }
    ]
  }
  // adicione o resto dos seus anos/projetos aqui...
];

function encontrarProjetoPorId(idDesejado, estrutura = estruturaEventos) {
  for (const secao of estrutura) {
    const projetoEncontrado = (secao.projetos || []).find(p => p.idUnico === idDesejado);
    if (projetoEncontrado) return projetoEncontrado;
    if (secao.projetos && secao.projetos[0] && secao.projetos[0].subGuias) {
      for (const subGuia of secao.projetos[0].subGuias) {
        const subProjeto = (subGuia.projetos || []).find(p => p.idUnico === idDesejado);
        if (subProjeto) return subProjeto;
      }
    }
  }
  return null;
}

function gerarListaDeSalas(data, containerId = 'container-salas') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  // atualiza header (opcional)
  const headerH1 = document.querySelector('header h1');
  const headerP = document.querySelector('header p');
  if (headerH1) headerH1.textContent = "CETI Padre Antônio José do Rego";
  if (headerP) headerP.textContent = "Seja bem-vindo(a) ao Dia D da EPT!";

  data.forEach(secao => {
    const secaoDiv = document.createElement('div');
    secaoDiv.className = 'secao-ano';

    const titulo = document.createElement('h2');
    titulo.textContent = secao.ano;
    secaoDiv.appendChild(titulo);

    const desc = document.createElement('p');
    desc.innerHTML = secao.descricao || '';
    secaoDiv.appendChild(desc);

    const prof = document.createElement('p');
    prof.className = 'professor-responsavel';
    prof.textContent = `Professor Responsável: ${secao.professorResponsavel || ''}`;
    secaoDiv.appendChild(prof);

    // Criar container de cards (se não existir)
    let cardsContainer = secaoDiv.querySelector('.cards-container');
    if (!cardsContainer) {
      cardsContainer = document.createElement('div');
      cardsContainer.className = 'cards-container';
      secaoDiv.appendChild(cardsContainer);
    }

    (secao.projetos || []).forEach(projeto => {
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
      } else {
        btn.textContent = 'ABRIR';
      }
      card.appendChild(btn);

      cardsContainer.appendChild(card);
    });

    container.appendChild(secaoDiv);
  });
}

function adicionarFiltro() {
  const input = document.getElementById('input-pesquisa');
  if (!input) return;
  input.addEventListener('keyup', function () {
    const filtro = this.value.toLowerCase();
    const secoes = document.querySelectorAll('.secao-ano');
    secoes.forEach(secao => {
      let visivel = false;
      if (secao.textContent.toLowerCase().includes(filtro)) visivel = true;
      secao.querySelectorAll('.sala-card').forEach(card => {
        const textoCard = card.textContent.toLowerCase();
        if (textoCard.includes(filtro)) {
          card.style.display = 'block';
          visivel = true;
        } else {
          card.style.display = 'none';
        }
      });
      secao.style.display = visivel || filtro === '' ? 'flex' : 'none';
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

  const iframe = document.createElement('iframe');
  iframe.width = "100%";
  iframe.height = "400";
  iframe.src = `https://www.youtube.com/embed/${projeto.youtubeID}`;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  videoContainer.innerHTML = '';
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

document.addEventListener('DOMContentLoaded', () => {
  gerarListaDeSalas(estruturaEventos);
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
});