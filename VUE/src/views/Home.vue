<template>
  <main id="#homeMain" class="flex gap-4 no-scrollbar">
    <Sidebar @categoriaAtual="loadCategoria" />
    <Catalogo
      :categoria="cat"
      :products="produtoStore.getProdutosByCategoria(cat)"
    />
  </main>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import Catalogo from '@/components/Catalogo.vue'
import { useProdutoStore } from '@/stores/produtoStore'
import { ref } from 'vue'

export default {
  components: {
    Sidebar,
    Catalogo,
  },
  setup() {
    const cat = ref('')
    const produtoStore = useProdutoStore()

    const loadCategoria = async (value) => {
      cat.value = value
    }

    loadCategoria('Perfume')
    return {
      cat,
      loadCategoria,
      produtoStore,
    }
  },
}
</script>
