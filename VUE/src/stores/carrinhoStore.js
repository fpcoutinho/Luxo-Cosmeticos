import { defineStore } from 'pinia'

export const useCarrinhoStore = defineStore('carrinhoStore', {
  state: () => ({
    carrinho: [],
    total: 0,
  }),
  getters: {
    getCarrinho: (state) => state.carrinho,
    getTotal: (state) => state.total,
  },
  actions: {
    addToCarrinho(produto) {
      for (let i = 0; i < this.carrinho.length; i++) {
        if (this.carrinho[i].produto._id === produto._id) {
          this.carrinho[i].qtd++
          this.total += produto.preco
          return
        }
      }
      this.carrinho.push({ qtd: 1, produto: produto })
      this.total += produto.preco
    },
    removeFromCarrinho(produto) {
      for (let i = 0; i < this.carrinho.length; i++) {
        if (this.carrinho[i].produto._id === produto._id) {
          this.carrinho.splice(i, 1)
          this.total -= produto.preco
          return
        }
      }
    },
    diminuiQtd(produto) {
      for (let i = 0; i < this.carrinho.length; i++) {
        if (this.carrinho[i].produto._id === produto._id) {
          this.carrinho[i].qtd--
          this.total -= produto.preco
          if (this.carrinho[i].qtd === 0) {
            this.carrinho.splice(i, 1)
          }
          return
        }
      }
    },
    clearCarrinho() {
      this.carrinho = []
    },
  },
})
