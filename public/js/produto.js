//Módulo controlador contendo uma lista de todos os produtos
const listaProdutos = (() => {
  //array de produtos
  const produtos = [];
  //adiciona um produto ao array
  const adicionarProduto = (produto) => {
    produtos.push(produto);
  };
  //retorna o array de produtos
  const getProdutos = () => produtos;
  //retorna um produto pelo id
  const getProduto = (id) => {
    const produto = produtos.find((produto) => produto.getId() === id);
    return produto;
  };
  //retorna um array de produtos filtrados por categoria
  const getProdutosPorCategoria = (categoria) => {
    const produtosFiltrados = produtos.filter(
      (produto) => produto.getCategoria() === categoria
    );
    return produtosFiltrados;
  };
  //retorna um array de produtos filtrados por nome
  const getProdutosPorNome = (nome) => {
    const produtosFiltrados = produtos.filter((produto) =>
      produto.getNome().contains(nome)
    );
    return produtosFiltrados;
  };
  //retorna um array de produtos filtrados por marca
  const getProdutosPorMarca = (marca) => {
    const produtosFiltrados = produtos.filter(
      (produto) => produto.getMarca() === marca
    );
    return produtosFiltrados;
  };
  //retorna um array de produtos filtrados por preço min max
  const getProdutosPorPreco = (min, max) => {
    const produtosFiltrados = produtos.filter(
      (produto) => produto.getPreco() >= min && produto.getPreco() <= max
    );
    return produtosFiltrados;
  };

  return {
    adicionarProduto,
    getProdutos,
    getProduto,
    getProdutosPorCategoria,
    getProdutosPorNome,
    getProdutosPorMarca,
    getProdutosPorPreco,
  };
})();

//Factory de Produtos
const produtoFactory = (
  nome,
  marca,
  volume,
  preco,
  descricao,
  categoria,
  imagem
) => {
  //id único
  const id = Date.now();

  //gets and sets
  const getId = () => id;
  const getNome = () => nome;
  const setNome = (novoNome) => {
    nome = novoNome;
  };
  const getMarca = () => marca;
  const setMarca = (novaMarca) => {
    marca = novaMarca;
  };
  const getVolume = () => volume;
  const setVolume = (novoVolume) => {
    volume = novoVolume;
  };
  const getPreco = () => preco;
  const setPreco = (novoPreco) => {
    preco = novoPreco;
  };
  const getDescricao = () => descricao;
  const setDescricao = (novaDescricao) => {
    descricao = novaDescricao;
  };
  const getCategoria = () => categoria;
  const setCategoria = (novaCategoria) => {
    categoria = novaCategoria;
  };
  const getImagem = () => imagem;
  const setImagem = (novaImagem) => {
    imagem = novaImagem;
  };

  return {
    getId,
    getNome,
    setNome,
    getMarca,
    setMarca,
    getVolume,
    setVolume,
    getPreco,
    setPreco,
    getDescricao,
    setDescricao,
    getCategoria,
    setCategoria,
    getImagem,
    setImagem,
  };
};

//função de adicionar produto com inputs do form de produto.ejs
const formularioDeProduto = document.querySelector(".form-cosmetico");
formularioDeProduto.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.querySelector("#nome").value;
  const marca = document.querySelector("#marca").value;
  const volume = document.querySelector("#volume").value;
  const preco = document.querySelector("#preco").value;
  const descricao = document.querySelector("#descricao").value;
  const categoria = document.querySelector("#categoria").value;
  const imagem = document.querySelector("#imagem").value;
  const produto = produtoFactory(
    nome,
    marca,
    volume,
    preco,
    descricao,
    categoria,
    imagem
  );
  listaProdutos.adicionarProduto(produto);
  console.log(listaProdutos.getProdutos());
});

//função de validação dos componentes de um produto a cada input no form
const nome = document.getElementById("nome");
const marca = document.getElementById("marca");
const volume = document.getElementById("volume");
const preco = document.getElementById("preco");
const descricao = document.getElementById("descricao");
const categoria = document.getElementById("categoria");
const imagem = document.getElementById("imagem");

nome.addEventListener("input", (event) => {
  if (nome.validity.typeMismatch) {
    nome.setCustomValidity("O nome deve conter apenas letras");
  } else if (nome.value.length < 3) {
    nome.setCustomValidity("O nome deve ter no mínimo 3 caracteres");
  } else if (nome.value.length > 30) {
    nome.setCustomValidity("O nome deve ter no máximo 30 caracteres");
  } else {
    nome.setCustomValidity("");
  }
});

volume.addEventListener("input", (event) => {
  if (volume.validity.typeMismatch) {
    volume.setCustomValidity("O volume deve conter apenas números");
  } else if (volume.value.length < 1) {
    volume.setCustomValidity("O volume deve ter no mínimo 1 caracter");
  } else if (volume.value.length > 5) {
    volume.setCustomValidity("O volume deve ter no máximo 5 caracteres");
  } else {
    volume.setCustomValidity("");
  }
});

preco.addEventListener("input", (event) => {
  if (preco.validity.typeMismatch) {
    preco.setCustomValidity("O preço deve conter apenas números");
  } else if (parseFloat(preco.value) < 1) {
    preco.setCustomValidity("O deve ser maior que 0");
  } else if (parseFloat(preco.value) > 100000) {
    preco.setCustomValidity("O preço deve ser menor que 100.000");
  } else {
    preco.setCustomValidity("");
  }
});
