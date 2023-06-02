<template>
  <main>
    <h1>Oi, {{ user.name }}</h1>
    <p></p>
  </main>
</template>

<script>
export default {
  name: 'User',
  props: ['user'],
}
</script>
