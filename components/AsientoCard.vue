<template>
  <div
    class="shadow-lg py-4 px-6 rounded bg-white mb-8 flex items-center border-white hover:border-indigo-500 border-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      class="fill-current mr-2 text-indigo-500"
      viewBox="0 0 24 24"
    >
      <defs>
        <path id="a" d="M0 0h24v24H0V0z" />
      </defs>
      <clipPath id="b">
        <use xlink:href="#a" overflow="visible" />
      </clipPath>
      <path
        d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"
        clip-path="url(#b)"
      />
    </svg>
    <div class="flex items-center flex-1">
      <p class="text-lg mr-auto" v-text="`${asiento.num_asiento}`"></p>
      <div class="border-2 rounded border-gray-700 px-4 py-1 text-center mr-4">
        <p
          class="font-mono text-gray-700 tracking-wider font-bold"
          v-text="bus.patente"
        ></p>
        <p class="text-xxs font-bold tracking-wider">CHILE</p>
      </div>
      <!-- Destroy -->
      <button
        class="text-gray-400 hover:text-gray-700 focus:outline-none"
        @click="$emit('destroy', asiento)"
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
  props: ["asiento"],
  computed: {
    bus() {
      return this.$store.state.buses.list.find(
        b => b.id === this.asiento.id_bus
      );
    }
  }
};
</script>