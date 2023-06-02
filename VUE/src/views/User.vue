<template>
  <main>
    <h1>Oi, {{ user.name }}</h1>
    <p><button type="button" @click="logout">logout</button></p>
  </main>
</template>

<script>
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'
import router from '@/router'

export default {
  name: 'User',
  setup() {
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    const logout = () => {
      userStore.logout()
      router.push('login')
    }

    return {
      user,
      logout,
    }
  },
}
</script>
