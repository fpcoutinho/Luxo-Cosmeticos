<template>
  <main id="#homeMain" class="flex gap-4 no-scrollbar">
    <Sidebar @categoriaAtual="loadCategoria" />
    <Catalogo :categoria="cat" :products="products" />
  </main>
</template>

<script setup>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import Catalogo from '@/components/Catalogo.vue'
import { ref } from 'vue'
import axios from 'axios'

const products = ref([])
const error = ref(null)
const cat = ref('')

const loadCategoria = async (value) => {
  cat.value = value
  const url = '/produtos/categoria/' + value
  try {
    let data = await axios.get(url)
    if (!data.status === 200) {
      products.value = []
      throw new Error('Erro ao carregar os dados')
    }
    products.value = data.data
  } catch (err) {
    error.value = err.message
  }
}

loadCategoria('Perfume')
</script>
