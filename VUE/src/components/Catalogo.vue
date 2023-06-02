<template>
  <div class="bg-secondary-100 flex-1 ml-48">
    <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-2xl tracking-tight text-gray-400">{{ categoria }}</h1>

      <div
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="product in products"
          :key="product._id"
          class="group relative"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75"
          >
            <img
              :src="product.imagem"
              :alt="product.nome"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <router-link
                  :to="{ name: 'produto', params: { id: product._id } }"
                >
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.nome }}
                </router-link>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ product.marca }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">
                R$ {{ product.preco }}
              </p>
              <div class="flex gap-2">
                <button type="button">
                  <HeartIcon class="navicon" />
                </button>
                <button type="button" @click="addToCart(product)">
                  <PlusCircleIcon class="navicon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HeartIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { useCarrinhoStore } from '@/stores/carrinhoStore'

export default {
  name: 'Catalogo',
  components: {
    HeartIcon,
    PlusCircleIcon,
  },
  props: {
    categoria: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const carrinhoStore = useCarrinhoStore()

    const addToCart = (product) => {
      carrinhoStore.addToCarrinho(product)
      console.log(carrinhoStore)
    }

    return {
      addToCart,
    }
  },
}
</script>
