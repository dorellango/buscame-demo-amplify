<template>
  <div class="sans-serif bg-gray-100 h-screen">
    <Nav />
    <div class="container mx-auto">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Nav from "~/components/Nav";

export default {
  components: { Nav }
};
</script>

<style lang="sass">
  .btn-indigo
    @apply bg-indigo-500 rounded-full font-bold shadow-md px-6 py-2 tracking-wider text-indigo-100
  .btn-yellow
    @apply bg-yellow-500 rounded-full font-bold shadow-md px-6 py-2 tracking-wider text-yellow-900
</style>
