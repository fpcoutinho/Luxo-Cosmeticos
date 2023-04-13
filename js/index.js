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

const form = document.querySelector('form');
const resultSection = document.getElementById('result');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // evita que a página seja recarregada
  const city = form.elements.city.value;
  const url = `https://goweather.herokuapp.com/weather/${city}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temperature = data.temperature;
      const description = data.description;
      const humidity = data.humidity;
      const wind = data.wind;
      console.log(data);

      resultSection.innerHTML = `
        <h2>${city}</h2>
        <p>Temperatura: ${temperature}</p>
        <p>Vento: ${wind}</p>
        <p>Description: ${description}</p>


      `;
    })
    .catch(error => {
      resultSection.innerHTML = `<p>Não foi possível obter a previsão do tempo para ${city}.</p>`;
    });
});

$(function () {
  const cities = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Curitiba",
    "Porto Alegre",
    "Salvador",
    "Fortaleza",
    "Recife",
    "Brasília",
    "Manaus",
    "Belém",
    "Goiânia",
    "São Luís",
    "Campinas",
    "Guarulhos",
    "São Bernardo do Campo",
    "Osasco",
    "Santo André",
    "Ribeirão Preto",
    "Sorocaba",
    "São José dos Campos",
    "Uberlândia",
    "Joinville",
    "Florianópolis",
    "Natal",
    "Maceió",
    "Vitória",
    "João Pessoa",
    "Aracaju",
    "Cuiabá",
    "Campo Grande",
    "Teresina",
    "Palmas"
  ];
  $("#city").autocomplete({
    source: cities
  });
});