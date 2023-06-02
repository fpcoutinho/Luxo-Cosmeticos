<template>
  <Header :user="user" />
  <router-view :user="user" />
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useUserStore } from './stores/userStore'
import { storeToRefs } from 'pinia'

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    const user = ref(null)
    const userStore = useUserStore()
    onMounted(async () => {
      await userStore.fetchUser()
      const { getUser } = storeToRefs(userStore)
      user.value = getUser.value
    })
    return {
      user,
    }
  },
}
</script>
