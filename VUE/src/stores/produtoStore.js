import { defineStore } from 'pinia'
import axios from 'axios'

export const useProdutoStore = defineStore('produtoStore', {
  state: () => ({
    produtos: [],
  }),
  getters: {
    getProdutos: (state) => state.produtos,
    getProdutosByCategoria: (state) => (categoria) => {
      return state.produtos.filter((produto) => produto.categoria === categoria)
    },
  },
  actions: {
    async fetchProdutos() {
      try {
        const data = await axios.get('/produtos')
        if (!data.status === 200) {
          this.produtos = []
          throw new Error('Erro ao carregar os produtos.')
        }
        this.produtos = data.data
      } catch (err) {
        console.log(err.message)
      }
    },
  },
  async addProduto(produto) {
    try {
      const data = await axios.post('/produtos', produto)
      if (!data.status === 200) {
        throw new Error('Erro ao adicionar o produto.')
      }
      this.produtos.push(data.data)
    } catch (err) {
      console.log(err.message)
    }
  },
})
