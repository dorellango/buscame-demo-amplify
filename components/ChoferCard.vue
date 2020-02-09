<template>
  <div
    class="shadow-lg py-4 px-6 rounded bg-white mb-8 flex items-center border-white hover:border-indigo-500 border-2"
  >
    <svg
      class="block h-12 w-12 mr-4 fill-current text-gray-300 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"
      />
    </svg>

    <div class="border-l pl-4 border-gray-200 flex-1">
      <p
        class="text-lg mb-1 text-indigo-800"
        v-text="`${chofer.nombre} ${chofer.apellido}`"
      ></p>
      <p
        class="font-mono text-xs text-gray-600 tracking-wider"
        v-rut="chofer.rut"
      ></p>
    </div>
    <button
      class="text-gray-400 hover:text-gray-700 focus:outline-none"
      @click="$emit('destroy', chofer)"
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
</template>

<script>
export default {
  props: ["chofer"]
};
</script>

<style>
</style>