<template>
  <div
    class="shadow-lg py-4 px-6 rounded bg-white mb-8 flex items-center border-white hover:border-indigo-500 border-2"
  >
    <svg
      class="mr-2 text-indigo-500"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
    <div class="flex items-center flex-1">
      <p class="text-lg mr-auto" v-text="`${pasajero.nombre} ${pasajero.apellido}`"></p>
      <p class="font-mono text-gray-500 tracking-wide">{{ pasajero.rut }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pasajero"]
};
</script>

<style>
</style>