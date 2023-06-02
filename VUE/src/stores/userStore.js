import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    token: null,
    favorites: [],
  }),
  getters: {
    getUser: (state) => state.user,
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
            this.user = null
            throw new Error('Erro ao carregar o user.')
          }
          this.user = data.data
        } catch (err) {
          panic(err.message)
        }
      }
    },
  },
})
