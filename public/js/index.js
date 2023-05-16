// preencher ul com os produtos do img/produtos/perfumes
const ulPerfumes = document.querySelector(".lista-perfumes");
const perfumes = [
  "../public/img/produtos/perfumes/1.png",
  "../public/img/produtos/perfumes/2.png",
  "../public/img/produtos/perfumes/3.png",
  "../public/img/produtos/perfumes/4.png",
  "../public/img/produtos/perfumes/5.png",
  "../public/img/produtos/perfumes/6.png",
  "../public/img/produtos/perfumes/7.png",
  "../public/img/produtos/perfumes/8.png",
  "../public/img/produtos/perfumes/9.png",
  "../public/img/produtos/perfumes/10.png",
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
