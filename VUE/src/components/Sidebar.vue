<template>
  <aside
    class="sidebar fixed left-0 h-full w-48 text-primary-100 bg-primary-500 shadow-md shadow-secondary-500 rounded-tr-lg py-4 box-border"
  >
    <h3 class="mt-0 mb-6">Categorias</h3>
    <ul class="list-none p-0 mx-0">
      <li
        class="py-2 px-3 hover:ease-in hover:duration-300 hover:shadow-md hover:opacity-80"
      >
        <button
          type="button"
          @click="$emit('categoriaAtual', 'Perfume')"
          class="w-full no-underline ease-in duration-500"
        >
          Perfumes
        </button>
      </li>
      <li
        class="py-2 px-3 hover:ease-in hover:duration-300 hover:shadow-md hover:opacity-80"
      >
        <button type="button" @click="$emit('categoriaAtual', 'Maquiagem')">
          Maquiagens
        </button>
      </li>
      <li
        class="py-2 px-3 hover:ease-in hover:duration-300 hover:shadow-md hover:opacity-80"
      >
        <button type="button" @click="$emit('categoriaAtual', 'Cabelo')">
          Cabelos
        </button>
      </li>
      <li
        class="py-2 px-3 hover:ease-in hover:duration-300 hover:shadow-md hover:opacity-80"
      >
        <button type="button" @click="$emit('categoriaAtual', 'Pele')">
          Pele
        </button>
      </li>
      <li
        class="py-2 px-3 hover:ease-in hover:duration-300 hover:shadow-md hover:opacity-80"
      >
        <button type="button" @click="$emit('categoriaAtual', 'Cuidados')">
          Cuidados
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup>
defineEmits(['categoriaAtual'])
</script>
