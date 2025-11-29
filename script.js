// script.js (versão corrigida)

// --- Configurações iniciais
const IMAGEM_PADRAO = ''; // troque por URL se quiser

function gerarIdUnico(nome, ano) {
  return (ano + '-' + nome).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

// --- Estrutura de dados (mantive a sua, apenas exemplo curto abaixo)
// (Seus dados originais continuam válidos — aqui só um trecho de exemplo. 
//  Se você já tem a variável estruturaEventos no arquivo, mantenha-a.)
/* const estruturaEventos = [ ... ] */ 

// --- Procura projeto por id (mantive sua função)
function encontrarProjetoPorId(idDesejado, estrutura = estruturaEventos) {
  for (const secao of estrutura) {
    const projetoEncontrado = secao.projetos.find(p => p.idUnico === idDesejado);
    if (projetoEncontrado) return projetoEncontrado;
    if (secao.projetos[0] && secao.projetos[0].subGuias) {
      for (const subGuia of secao.projetos[0].subGuias) {
        const subProjetoEncontrado = subGuia.projetos.find(p => p.idUnico === idDesejado);
        if (subProjetoEncontrado) return subProjetoEncontrado;
      }
    }
  }
  return null;
}

// --- Renderização principal
function gerarListaDeSalas(data, containerId = 'container-salas') {
  const container = document.getElementById(containerId);
  if (!container) return; // segurança
  container.innerHTML = '';

  const headerH1 = document.querySelector('header h1');
  const headerP = document.querySelector('header p');
  if (headerH1) headerH1.textContent = "CETI Padre Antônio José do Rego";
  if (headerP) headerP.textContent = "Seja bem-vindo(a) ao Dia D da EPT!";

  data.forEach(secao => {
    const secaoDiv = document.createElement('div');
    secaoDiv.className = 'secao-ano';

    // Cabeçalho da seção
    const titulo = document.createElement('h2');
    titulo.textContent = secao.ano;
    secaoDiv.appendChild(titulo);

    const descricao = document.createElement('p');
    descricao.innerHTML = secao.descricao || '';
    secaoDiv.appendChild(descricao);

    const prof = document.createElement('p');
    prof.className = 'professor-responsavel';
    prof.textContent = `Professor Responsável: ${secao.professorResponsavel || ''}`;
    secaoDiv.appendChild(prof);

    // Criamos UM container para os cards (isso corrige o erro)
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';
    secaoDiv.appendChild(cardsContainer);

    // Loop de criação dos cards
    secao.projetos.forEach(projeto => {
      const card = document.createElement('div');
      card.setAttribute('data-id-projeto', projeto.idUnico);
      card.setAttribute('data-tipo', projeto.tipo);

      if (projeto.tipo === "video") {
        card.className = 'sala-card video-card';
        card.innerHTML = `
          <h3>${projeto.nome}</h3>
          <p>Professor(a): ${projeto.professor}</p>
          <button class="btn-abrir-video">ASSISTIR VÍDEO</button>
        `;
        card.addEventListener('click', () => abrirModalVideoPorId(projeto.idUnico));
      } else if (projeto.tipo === "wiki") {
        card.className = 'sala-card wiki-card';
        card.innerHTML = `
          <h3>${projeto.nome}</h3>
          <p>Professor(a): ${projeto.professor}</p>
          <button class="btn-abrir-wiki">VER WIKI</button>
        `;
        card.addEventListener('click', () => abrirModalWikiPorId(projeto.idUnico));
      } else if (projeto.tipo === "guia-principal") {
        card.className = 'sala-card guia-btn';
        card.innerHTML = `
          <h3>${projeto.nome}</h3>
          <p>${projeto.professor || ''}</p>
          <button>➡️ CLIQUE PARA ABRIR O GUIA</button>
        `;
        card.addEventListener('click', () => abrirSubGuia(secao));
      }

      cardsContainer.appendChild(card);
    });

    container.appendChild(secaoDiv);
  });
}

// --- Filtro em tempo real
function adicionarFiltro() {
  const input = document.getElementById('input-pesquisa');
  if (!input) return;
  input.addEventListener('keyup', function() {
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

// --- Sub-guia (3º ano)
function abrirSubGuia(secao) {
  const containerPrincipal = document.getElementById('container-salas');
  if (!containerPrincipal) return;
  containerPrincipal.innerHTML = '';
  const btnVoltar = document.createElement('button');
  btnVoltar.textContent = "⬅️ Voltar ao Guia Principal";
  btnVoltar.style.cssText = "padding: 10px 20px; margin-bottom:20px;";
  btnVoltar.addEventListener('click', () => {
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

// --- Modal vídeo
function abrirModalVideoPorId(idProjeto) {
  const projeto = encontrarProjetoPorId(idProjeto);
  if (!projeto || !projeto.youtubeID) return;

  const modal = document.getElementById('modal-video'); // corresponde ao index sugerido
  const videoContainer = document.getElementById('video-embed-container');
  if (!modal || !videoContainer) return;

  // Monta iframe do YouTube (embed)
  const iframeHTML = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${projeto.youtubeID}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  videoContainer.innerHTML = iframeHTML;
  modal.style.display = 'block';
}

// --- Abrir wiki (redireciona para wiki.html com query)
function abrirModalWikiPorId(idProjeto) {
  const projeto = encontrarProjetoPorId(idProjeto);
  if (!projeto || !projeto.wikiContent) {
    alert("O conteúdo da Wiki para este projeto ainda não foi preenchido ou o projeto não foi encontrado.");
    return;
  }
  window.location.href = `wiki.html?id=${idProjeto}`;
}

// --- Fechar modal vídeo
function fecharModalVideo() {
  const modal = document.getElementById('modal-video');
  const videoContainer = document.getElementById('video-embed-container');
  if (videoContainer) videoContainer.innerHTML = '';
  if (modal) modal.style.display = 'none';
}

// --- Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Só tenta renderizar quando estivermos na página inicial
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    gerarListaDeSalas(estruturaEventos);
    adicionarFiltro();
  }

  // Eventos de fechamento do modal
  const fecharModalBtn = document.getElementById('fechar-modal-video');
  if (fecharModalBtn) fecharModalBtn.addEventListener('click', fecharModalVideo);

  window.addEventListener('click', (event) => {
    const modalVideo = document.getElementById('modal-video');
    if (modalVideo && event.target === modalVideo) fecharModalVideo();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') fecharModalVideo();
  });
});