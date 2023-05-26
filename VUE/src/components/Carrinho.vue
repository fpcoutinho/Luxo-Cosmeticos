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
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li
                            v-for="product in products"
                            :key="product.id"
                            class="flex py-6"
                          >
                            <div
                              class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                            >
                              <img
                                :src="product.imageSrc"
                                :alt="product.imageAlt"
                                class="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div
                                  class="flex justify-between text-base font-medium text-gray-900"
                                >
                                  <h3>
                                    <a :href="product.href">{{
                                      product.name
                                    }}</a>
                                  </h3>
                                  <p class="ml-4">R$ {{ product.price }}.00</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                  {{ product.color }}
                                </p>
                              </div>
                              <div
                                class="flex flex-1 items-end justify-between text-sm"
                              >
                                <p class="text-gray-500">
                                  Qty {{ product.quantity }}
                                </p>

                                <div class="flex">
                                  <button
                                    type="button"
                                    class="font-medium text-primary-600 hover:text-primary-500"
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
                      <p>R$909.00</p>
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

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps({
  openCarrinho: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['closeCarrinho'])

const products = [
  {
    id: 1,
    name: 'Perfume Acqua di Gio Profondo',
    href: '#',
    color: 'Armani',
    price: '649',
    quantity: 1,
    imageSrc:
      'https://luxo-cosmeticos.s3.us-west-2.amazonaws.com/e859d6945cb297dd09ea58e2a4a0f32c',
    imageAlt: 'The best cologne in the world.',
  },
  {
    id: 2,
    name: 'Kit Inoar Vitamina C',
    href: '#',
    color: 'Inoar',
    price: '60',
    quantity: 1,
    imageSrc:
      'https://luxo-cosmeticos.s3.us-west-2.amazonaws.com/ae3bf865500983bd445fc68cc95871c0',
    imageAlt: 'Low poo e vegano!!',
  },
  {
    id: 3,
    name: 'Base da Virgínia',
    href: '#',
    color: 'Sai com água',
    price: '200',
    quantity: 1,
    imageSrc:
      'https://luxo-cosmeticos.s3.us-west-2.amazonaws.com/5561532ac941b046353a396517663fee',
    imageAlt: 'Sai até com suor...',
  },
]
</script>
