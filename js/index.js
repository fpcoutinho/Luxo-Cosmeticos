const banners = ["img/destaque-home.png", "img/destaque-home-2.png"];
let bannerAtual = 0;

function trocaBanner() {
  bannerAtual = (bannerAtual + 1) % 2;
  document.querySelector(".banner").src = banners[bannerAtual];
}

const timer = setInterval(trocaBanner, 4000);
