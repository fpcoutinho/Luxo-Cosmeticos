<template>
  <TransitionRoot as="template" :show="openCarrinho">
    <Dialog
      as="div"
      class="relative z-10 mt-20"
      @close="$emit('closeCarrinho')"
    >
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto w-screen max-w-md no-scroll"
              >
                <div
                  class="flex pt-20 h-full flex-col overflow-y-auto no-scrollbar bg-white shadow-xl -z-10"
                >
                  <div
                    class="flex-1 overflow-y-auto no-scrollbar px-4 py-6 sm:px-6"
                  >
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900"
                        >Minha Sacola de Compras</DialogTitle
                      >
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="$emit('closeCarrinho')"
                        >
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul
                          v-if="c.length <= 0"
                          role="list"
                          class="-my-6 divide-y divide-gray-200"
                        >
                          <li>
                            <p>Não há nenhum produto no seu carrinho.</p>
                          </li>
                        </ul>
                        <ul
                          v-else
                          role="list"
                          class="-my-6 divide-y divide-gray-200"
                        >
                          <li
                            v-for="product in c"
                            :key="product.produto._id"
                            class="flex py-6"
                          >
                            <div
                              class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                            >
                              <img
                                :src="product.produto.imagem"
                                :alt="product.produto.nome"
                                class="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div
                                  class="flex justify-between text-base font-medium text-gray-900"
                                >
                                  <h3>
                                    <router-link
                                      :to="{
                                        name: 'produto',
                                        params: { id: product.produto._id },
                                      }"
                                      >{{ product.produto.nome }}</router-link
                                    >
                                  </h3>
                                  <p class="ml-4">
                                    R$ {{ product.produto.preco }}.00
                                  </p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                  {{ product.produto.marca }}
                                </p>
                              </div>
                              <div
                                class="flex flex-1 items-end justify-between text-sm"
                              >
                                <div
                                  class="text-gray-500 flex flex-row items-center"
                                >
                                  <span>Qty</span>
                                  <button
                                    type="button"
                                    class="w-4"
                                    @click="minusOne(product.produto)"
                                  >
                                    -
                                  </button>
                                  <span>{{ product.qtd }}</span>
                                  <button
                                    type="button"
                                    class="w-4"
                                    @click="addOne(product.produto)"
                                  >
                                    +
                                  </button>
                                </div>

                                <div class="flex">
                                  <button
                                    type="button"
                                    class="font-medium text-primary-600 hover:text-primary-500"
                                    @click="removeFromCart(product.produto)"
                                  >
                                    Remover
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <p>Subtotal</p>
                      <p>R$ {{ carrinhoStore.getTotal }},00</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Prossiga para calcular frete e prazo de entrega.
                    </p>
                    <div class="mt-6">
                      <a
                        href="#"
                        class="flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700"
                        >Fechar Pedido</a
                      >
                    </div>
                    <div
                      class="mt-6 flex justify-center text-center text-sm text-gray-500"
                    >
                      <p>
                        ou
                        <button
                          type="button"
                          class="font-medium text-primary-600 hover:text-primary-500"
                          @click="$emit('closeCarrinho')"
                        >
                          Continue Comprando
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  XMarkIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/vue/24/outline'
import { useCarrinhoStore } from '@/stores/carrinhoStore'
import { ref } from 'vue'

export default {
  name: 'Carrinho',
  props: {
    openCarrinho: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['closeCarrinho'],
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XMarkIcon,
    PlusCircleIcon,
    MinusCircleIcon,
  },
  setup() {
    const c = ref([])
    const carrinhoStore = useCarrinhoStore()
    c.value = carrinhoStore.getCarrinho

    const removeFromCart = (product) => {
      carrinhoStore.removeFromCarrinho(product)
    }

    const addOne = (product) => {
      carrinhoStore.addToCarrinho(product)
    }

    const minusOne = (product) => {
      carrinhoStore.diminuiQtd(product)
    }

    return {
      c,
      carrinhoStore,
      removeFromCart,
      addOne,
      minusOne,
    }
  },
}
</script>
