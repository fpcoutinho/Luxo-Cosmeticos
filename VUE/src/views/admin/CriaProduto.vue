<template>
  <main>
    <form @submit="criaProduto">
      <div class="form-header">
        <h2>Cadastro de Produto</h2>
      </div>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Nome do produto"
          required
        />
        <div class="error nome" id="erroNome"></div>
      </div>
      <div class="form-group">
        <label for="marca">Marca</label>
        <input
          type="text"
          name="marca"
          id="marca"
          placeholder="Marca do produto"
          required
        />
        <div class="error marca" id="erroMarca"></div>
      </div>
      <div class="form-group">
        <label for="volume">Volume</label>
        <input
          type="number"
          name="volume"
          id="volume"
          placeholder="Volume do produto (ml)"
          required
        />
        <div class="error volume" id="erroVolume"></div>
      </div>
      <div class="form-group">
        <label for="preco">Preço</label>
        <input
          type="number"
          name="preco"
          id="preco"
          placeholder="Preço do produto (R$)"
          required
        />
        <div class="error preco" id="erroPreco"></div>
      </div>
      <div class="form-group">
        <label for="categoria">Categoria</label>
        <select name="categoria" id="categoria" required>
          <option value="Perfume">Perfume</option>
          <option value="Pele">Produtos de Pele</option>
          <option value="Banho">Produtos de Banho</option>
          <option value="Maquiagem">Maquiagem</option>
        </select>
        <div class="error categoria" id="erroCategoria"></div>
      </div>
      <div class="form-group">
        <label for="genero">Genero</label>
        <select name="genero" id="genero" required>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Unissex">Unissex</option>
        </select>
        <div class="error genero" id="erroGenero"></div>
      </div>
      <div class="form-group">
        <label for="imagem">Imagem</label>
        <input type="text" name="imagem" id="imagem" required />
        <div class="error imagem" id="erroImagem"></div>
      </div>
      <div class="form-group">
        <label for="descricao">Descrição</label>
        <textarea
          name="descricao"
          id="descricao"
          cols="30"
          rows="10"
          placeholder="Descrição do produto"
          required
        ></textarea>
        <div class="error descricao" id="erroDescricao"></div>
      </div>
      <div class="form-group">
        <button
          class="bg-primary-500 text-primary-100 hover:bg-primary-400"
          type="submit"
        >
          Criar
        </button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: 'CriaProduto',
  data() {
    return {
      nome: '',
      marca: '',
      volume: '',
      preco: '',
      categoria: '',
      genero: '',
      imagem: '',
      descricao: '',
    }
  },
  methods: {
    async criaProduto(e) {
      e.preventDefault()
      const nome = form.nome.value
      const marca = form.marca.value
      const volume = form.volume.value
      const preco = form.preco.value
      const categoria = form.categoria.value
      const genero = form.genero.value
      const descricao = form.descricao.value
      const imagem = form.imagem.value

      try {
        const res = await fetch('/produto/cria', {
          method: 'POST',
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
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()

        if (data.errors) {
          nomeError.textContent = data.errors.nome
          marcaError.textContent = data.errors.marca
          volumeError.textContent = data.errors.volume
          precoError.textContent = data.errors.preco
          categoriaError.textContent = data.errors.categoria
          generoError.textContent = data.errors.genero
          descricaoError.textContent = data.errors.descricao
          imagemError.textContent = data.errors.imagem
        }

        if (data.produto) {
          location.assign('/')
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
a {
  color: var(--rosa);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h2 {
  color: var(--h);
}

ul {
  padding: 0;
  display: flex;
  gap: 1rem;
}

li {
  list-style: none;
}

form {
  width: 800px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
}

.form-group {
  text-align: start;
}

form button {
  margin: auto;
  margin-top: 10px;
}
form a {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #999;
  font-size: 0.8em;
}
form a:hover {
  color: #333;
}
input,
select,
textarea {
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  width: 100%;
}
select {
  width: 26.67em;
}
label {
  display: block;
  margin: 20px 0 10px;
}
button {
  margin-top: 30px;
  border-radius: 36px;
  border: 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
}
.error {
  color: #ff0099;
  margin: 10px 2px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
