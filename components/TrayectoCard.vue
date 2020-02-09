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
    <div
      class="w-full bg-indigo-600 text-indigo-100 py-2 px-6 tracking-wide text-lg flex justify-between"
    >
      <div class="mr-2">
        <p class="mb-1 text-xs text-indigo-300">Retorno:</p>
        <p>{{ trayecto.vuelta }}</p>
      </div>
      <!-- Destroy -->
      <button
        class="text-indigo-400 hover:text-indigo-300 focus:outline-none"
        @click="$emit('destroy', trayecto)"
      >
        <svg
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
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