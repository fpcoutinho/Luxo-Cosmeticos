import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    usuario: null,
    token: null,
    favorites: [],
  }),
  getters: {
    user: (state) => state.usuario,
    getToken: (state) => state.token,
    getFavorites: (state) => state.favorites,
  },
  actions: {
    async fetchUser() {
      const token = JSON.parse(localStorage.getItem('user'))
      this.token = token
      if (token) {
        const url = '/users/' + token
        try {
          const data = await axios.get(url)
          if (!data.status === 200) {
            this.usuario = null
            throw new Error('Erro ao carregar o user.')
          }
          this.usuario = data.data
        } catch (err) {
          console.log(err.message)
        }
      }
    },
    async logout() {
      await axios.post('/auth/logout')
      this.usuario = null
      this.token = null
      this.favorites = []
    },
    toggleFav(produto) {
      if (this.favorites.includes(produto)) {
        this.favorites = this.favorites.filter((fav) => fav._id !== produto._id)
      } else {
        this.favorites.push(produto)
      }
      console.log(this.favorites)
    },
  },
})
