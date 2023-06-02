<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'
import { useUserStore } from './stores/userStore'

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    const userStore = useUserStore()
    onMounted(async () => {
      await userStore.fetchUser()
    })
  },
}
</script>
