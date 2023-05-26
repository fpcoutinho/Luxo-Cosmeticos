<template>
  <main>
    <h1>Oi, {{ user.name }}</h1>
    <p></p>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const user = ref('')
const error = ref(null)

const getUser = async () => {
  const token = JSON.parse(localStorage.getItem('user'))
  if (token) {
    const url = '/users/' + token
    try {
      const data = await axios.get(url)
      if (!data.status === 200) {
        user.value = ''
        throw new Error('Erro ao carregar o user.')
      }
      user.value = data.data
    } catch (err) {
      error.value = err.message
    }
  }
}

getUser()
</script>
