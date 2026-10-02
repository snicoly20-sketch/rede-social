document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.querySelector(".like-btn");
  const postMedia = document.querySelector(".post-media");
  if (!likeBtn) return;

  const likesCountSpan = likeBtn.querySelector(".likes-count");
  const bookmarkBtn = document.querySelector(".bookmark-btn");

  let isLiked = false;
  let baseLikes = 1200; // Define o número inicial de curtidas (1.2K)

  // Formata números grandes (ex: 1200 -> 1.2K)
  function formatLikes(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  // Função para Incrementar / Adicionar Curtida
  function addLike() {
    if (!isLiked) {
      baseLikes++;
      isLiked = true;
      likeBtn.classList.add("liked");
    } else {
      baseLikes++; // Permite continuar aumentando ao clicar na foto
    }

    if (likesCountSpan) {
      likesCountSpan.textContent = formatLikes(baseLikes);
    }

    // Efeito visual de animação (bounce) no coração
    const svg = likeBtn.querySelector("svg");
    if (svg) {
      svg.style.transform = "scale(1.3)";
      setTimeout(() => {
        svg.style.transform = "scale(1)";
      }, 150);
    }
  }

  // Evento de clique no BOTÃO DE CORAÇÃO (Curte ou Descurte)
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (isLiked) {
      // Se já estava curtido, remove a curtida
      isLiked = false;
      baseLikes = Math.max(0, baseLikes - 1);
      likeBtn.classList.remove("liked");
      if (likesCountSpan) {
        likesCountSpan.textContent = formatLikes(baseLikes);
      }
    } else {
      // Se não estava curtido, adiciona
      addLike();
    }
  });

  // Evento de clique na IMAGEM PRINCIPAL (Sempre adiciona curtida)
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      addLike();
    });
  }

  // Evento no botão de SALVAR (Bookmark)
  if (bookmarkBtn) {
    let isBookmarked = false;
    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isBookmarked = !isBookmarked;
      bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

      const svg = bookmarkBtn.querySelector("svg");
      if (svg) {
        svg.style.transform = "scale(1.2)";
        setTimeout(() => {
          svg.style.transform = "scale(1)";
        }, 150);
      }
    });
  }
});