const banners = ["img/destaque-home.png", "img/destaque-home-2.png"];
let bannerAtual = 0;

function trocaBanner() {
  bannerAtual = (bannerAtual + 1) % 2;
  document.querySelector(".banner").src = banners[bannerAtual];
}

const timer = setInterval(trocaBanner, 4000);

const olsProduto = document.querySelectorAll(".lista-produtos");
const produtosNovidades = document.querySelectorAll(".novidades .produto");
const produtosVendidos = document.querySelectorAll(".mais-vendidos .produto");
const botaoMaisNovidades = document.getElementById("botao-mais-novidades");
const botaoMaisVendidos = document.getElementById("botao-mais-vendidos");

function verMais(botao, produtos) {
  if (botao.textContent === "mais produtos") {
    botao.textContent = "menos produtos";
  } else {
    botao.textContent = "mais produtos";
  }
  for (let i = 6; i < produtos.length; i++) {
    produtos[i].hidden
      ? (produtos[i].hidden = false)
      : (produtos[i].hidden = true);
  }
}

botaoMaisNovidades.addEventListener("click", () =>
  verMais(botaoMaisNovidades, produtosNovidades)
);
botaoMaisVendidos.addEventListener("click", () =>
  verMais(botaoMaisVendidos, produtosVendidos)
);
