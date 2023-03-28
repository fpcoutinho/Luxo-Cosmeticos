const banners = ["img/destaque-home.png", "img/destaque-home-2.png"];
let bannerAtual = 0;

function trocaBanner() {
  bannerAtual = (bannerAtual + 1) % 2;
  document.querySelector(".banner").src = banners[bannerAtual];
}

const timer = setInterval(trocaBanner, 4000);
// preencher ul com os produtos do img/produtos/perfumes
const ulPerfumes = document.querySelector(".lista-perfumes");
const perfumes = [
  "img/produtos/perfumes/1.png",
  "img/produtos/perfumes/2.png",
  "img/produtos/perfumes/3.png",
  "img/produtos/perfumes/4.png",
  "img/produtos/perfumes/5.png",
  "img/produtos/perfumes/6.png",
  "img/produtos/perfumes/7.png",
  "img/produtos/perfumes/8.png",
  "img/produtos/perfumes/9.png",
  "img/produtos/perfumes/10.png",
];

perfumes.forEach((perfume) => {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = perfume;
  const price = document.createElement("p");
  // random price between 99 and 299
  price.textContent = `R$ ${Math.floor(Math.random() * 200 + 99)},00`;
  li.appendChild(img);
  li.appendChild(price);
  ulPerfumes.appendChild(li);
});

