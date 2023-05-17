const nomeError = document.querySelector(".nome.error");
const marcaError = document.querySelector(".marca.error");
const volumeError = document.querySelector(".volume.error");
const precoError = document.querySelector(".preco.error");
const categoriaError = document.querySelector(".categoria.error");
const generoError = document.querySelector(".genero.error");
const descricaoError = document.querySelector(".descricao.error");
const imagemError = document.querySelector(".imagem.error");

// Remove mensagens de erro quando o usuário digitas nos inputs
const nomeInput = document.querySelector("#nome");
const marcaInput = document.querySelector("#marca");
const volumeInput = document.querySelector("#volume");
const precoInput = document.querySelector("#preco");
const categoriaInput = document.querySelector("#categoria");
const generoInput = document.querySelector("#genero");
const descricaoInput = document.querySelector("#descricao");
const imagemInput = document.querySelector("#imagem");

nomeInput.addEventListener("input", () => {
  nomeError.textContent = "";
});
marcaInput.addEventListener("input", () => {
  marcaError.textContent = "";
});
volumeInput.addEventListener("input", () => {
  volumeError.textContent = "";
});
precoInput.addEventListener("input", () => {
  precoError.textContent = "";
});
categoriaInput.addEventListener("input", () => {
  categoriaError.textContent = "";
});
generoInput.addEventListener("input", () => {
  generoError.textContent = "";
});
descricaoInput.addEventListener("input", () => {
  descricaoError.textContent = "";
});
imagemInput.addEventListener("input", () => {
  imagemError.textContent = "";
});

// Cria produto
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = form.nome.value;
  const marca = form.marca.value;
  const volume = form.volume.value;
  const preco = form.preco.value;
  const categoria = form.categoria.value;
  const genero = form.genero.value;
  const descricao = form.descricao.value;
  const imagem = form.imagem.value;

  try {
    console.log("antes do fetch!");
    const res = await fetch("/produto/cria", {
      method: "POST",
      body: JSON.stringify({
        nome,
        marca,
        volume,
        preco,
        categoria,
        genero,
        descricao,
        imagem,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.errors) {
      nomeError.textContent = data.errors.nome;
      marcaError.textContent = data.errors.marca;
      volumeError.textContent = data.errors.volume;
      precoError.textContent = data.errors.preco;
      categoriaError.textContent = data.errors.categoria;
      generoError.textContent = data.errors.genero;
      descricaoError.textContent = data.errors.descricao;
      imagemError.textContent = data.errors.imagem;
    }

    if (data.produto) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});
