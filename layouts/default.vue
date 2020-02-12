<template>
  <div class="sans-serif bg-gray-100 h-screen">
    <Nav />
    <div class="container mx-auto px-4">
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
  .btn-default
    @apply rounded font-bold px-6 py-2 tracking-wider text-gray-600
  .btn-indigo
    @apply bg-indigo-500 border-2 border-indigo-500 rounded font-bold shadow-md px-6 py-2 tracking-wider text-indigo-100
  .btn-indigo-o
    @apply border-2 border-indigo-500 rounded font-bold shadow-md px-6 py-2 tracking-wider text-indigo-500
  .btn-yellow
    @apply bg-yellow-500 border-2 border-yellow-500 rounded font-bold shadow-md px-6 py-2 tracking-wider text-yellow-900

  .fade-enter-active,
  .fade-leave-active
    transition: opacity 0.5s

  .fade-enter,
  .fade-leave-to
    opacity: 0


</style>
