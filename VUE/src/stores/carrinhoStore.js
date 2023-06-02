import { defineStore } from 'pinia'

export const useCarrinhoStore = defineStore('carrinhoStore', {
  state: () => ({
    carrinho: [],
  }),
  getters: {
    getCarrinho: (state) => state.carrinho,
  },
  actions: {
    addToCarrinho(produto) {
      for (let i = 0; i < this.carrinho.length; i++) {
        if (this.carrinho[i].produto.id === produto.id) {
          this.carrinho[i].qtd++
          return
        }
      }
      this.carrinho.push({ qtd: 1, produto: produto })
    },
    removeFromCarrinho(produto) {
      for (let i = 0; i < this.carrinho.length; i++) {
        if (this.carrinho[i].produto.id === produto.id) {
          this.carrinho.splice(i, 1)
          return
        }
      }
    },
    clearCarrinho() {
      this.carrinho = []
    },
  },
})
