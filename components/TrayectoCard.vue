<template>
  <div class="flex items-center shadow-md mb-4">
    <div class="w-full bg-indigo-100 py-2 px-6 flex items-center">
      <div class="tracking-wide text-lg mr-auto">
        <p class="mb-1 text-xs text-gray-600">Salida:</p>
        <p>{{ trayecto.ida }}</p>
      </div>
      <p
        class="bg-indigo-600 text-xs px-4 py-1 text-indigo-100 rounded-full"
        v-text="trayecto.terminal"
      ></p>
    </div>
    <div class="w-full bg-indigo-600 text-indigo-100 py-2 px-6 tracking-wide text-lg">
      <p class="mb-1 text-xs text-indigo-300">Destino:</p>
      <p>{{ trayecto.vuelta }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["trayecto"]
};
</script>

<style>
</style>