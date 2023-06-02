<template>
  <header
    class="fixed top-0 left-0 h-16 w-full z-50 flex gap-10 shadow-sm shadow-primary-500 bg-white px-4 py-0"
  >
    <div class="img-header flex-1">
      <router-link to="/">
        <img
          src="../../public/img/logo-strong.png"
          alt="Logo"
          class="h-full w-auto rounded-md"
        />
      </router-link>
    </div>
    <nav class="nav-header flex-3 h-full flex items-center gap-4 p-0">
      <router-link to="/" title="Início"
        ><HomeIcon class="navicon text-primary-500"> </HomeIcon
      ></router-link>

      <router-link to="favorites" title="Favoritos"
        ><HeartIcon class="navicon text-primary-500"> </HeartIcon
      ></router-link>

      <router-link v-if="user === null" to="login" title="Log in"
        ><UserIcon class="navicon text-primary-500"> </UserIcon>
      </router-link>

      <router-link v-else to="user" title="UserView"
        ><UserIcon class="navicon text-primary-500"> </UserIcon
      ></router-link>

      <router-link to="about" title="Sobre"
        ><InformationCircleIcon class="navicon text-primary-500">
        </InformationCircleIcon
      ></router-link>

      <router-link to="help" title="Ajuda"
        ><QuestionMarkCircleIcon class="navicon text-primary-500">
          help
        </QuestionMarkCircleIcon></router-link
      >
    </nav>
    <nav class="nav-header flex-3 h-full flex items-center gap-4 p-0">
      <button
        type="button"
        title="Sacola de Compras"
        class="no-underline text-sm"
        @click="toggleCarrinho"
      >
        <ShoppingBagIcon class="navicon text-primary-300">
          shopping_cart
        </ShoppingBagIcon>
      </button>
    </nav>
  </header>
  <Carrinho :openCarrinho="openCarrinho" @closeCarrinho="toggleCarrinho" />
</template>

<script>
import {
  HomeIcon,
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import Carrinho from './Carrinho.vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

export default {
  name: 'Header',
  components: {
    HomeIcon,
    UserIcon,
    HeartIcon,
    ShoppingBagIcon,
    InformationCircleIcon,
    QuestionMarkCircleIcon,
    Carrinho,
  },
  setup() {
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    const openCarrinho = ref(false)
    const toggleCarrinho = () => {
      openCarrinho.value = !openCarrinho.value
    }
    return {
      toggleCarrinho,
      openCarrinho,
      user,
    }
  },
}
</script>
