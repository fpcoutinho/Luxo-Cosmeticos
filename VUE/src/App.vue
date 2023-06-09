<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { onBeforeMount } from 'vue'
import { useUserStore } from './stores/userStore'
import { useProdutoStore } from './stores/produtoStore'

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    const userStore = useUserStore()
    const produtoStore = useProdutoStore()
    onBeforeMount(async () => {
      await userStore.fetchUser()
      await produtoStore.fetchProdutos()
    })
  },
}
</script>
