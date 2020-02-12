<template>
  <div class="w-full md:w-1/3 lg:w-1/4 p-2">
    <div
      class="text-center shadow-lg rounded bg-white py-4 px-6 border-white hover:border-indigo-500 border-2 relative"
    >
      <svg
        class="mb-8 fill-current text-indigo-800 h-24 w-24 mb-2 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-4 -2 24 24"
        width="24"
        height="24"
        preserveAspectRatio="xMinYMin"
      >
        <path
          d="M11 17H5v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2.535A3.998 3.998 0 0 1 0 13V4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v9c0 1.48-.804 2.773-2 3.465V19a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2zm3-8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v5h12zm0 2H2v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2zM4 3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm0 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </svg>
      <div
        class="border-2 border-gray-800 rounded px-4 py-1 mb-8 tracking-widest"
      >
        <p class="font-mono text-gray-800 text-lg" v-text="bus.patente"></p>
        <small
          class="text-xxs text-center block font-mono tracking-widest text-gray-700"
          >CHILE</small
        >
      </div>
      <div class="mb-4 text-left">
        <p class="text-xs text-gray-500">Chofer</p>
        <p
          class="text-gray-700 text-lg"
          v-text="`${chofer.nombre} ${chofer.apellido}`"
        ></p>
      </div>
      <div class="text-right">
        <p
          class="inline-block text-xs bg-gray-300 text-gray-500 tracking-wide px-4 rounded-full"
          v-text="bus.marca"
        ></p>
      </div>
      <button
        type="button"
        @click="$emit('destroy', bus)"
        class="block top-0 left-0 absolute pl-2 pt-2 focus:outline-none"
      >
        <svg
          class="fill-current h-4 w-4 text-gray-400 hover:text-gray-500"
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
  data() {
    return {
      chofer: this.choferes.find(c => c.id === this.bus.id_chofer)
    };
  },
  props: ["bus", "choferes"]
};
</script>

<style>
</style>