<template>
  <div class="flex mb-2">
    <div
      class="flex-1 font-mono text-lg text-center text-gray-500 rounded rounded-r-none border border-r-0 h-12 px-3 flex items-center justify-between"
    >
      <p class="text-sm" v-text="`${horario.fecha} ${horario.hora}`"></p>
      <div class="ml-2 flex items-center">
        <p v-if="bus" class="text-sm" v-text="bus.patente"></p>

        <svg
          class="fill-current ml-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-4 -2 24 24"
          width="24"
          height="24"
          preserveAspectRatio="xMinYMin"
        >
          <path
            d="M4 2a2 2 0 0 0-2 2v5l12-.037V4a2 2 0 0 0-2-2H4zm7 15H5v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2.535A3.998 3.998 0 0 1 0 13V4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v9c0 1.48-.804 2.773-2 3.465V19a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2zm-7-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM4 3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1z"
          />
        </svg>
      </div>
    </div>
    <button
      type="button"
      @click="chooseBus"
      :class="[active ? '' : 'opacity-50']"
      class="h-12 w-10 focus:outline-none bg-indigo-700 text-indigo-100 rounded-r block flex items-center justify-center hover:bg-indigo-400"
    >
      <svg
        v-if="active"
        class="fill-current h-6 w-6 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <svg
        v-else
        class="fill-current h-6 w-6 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bus: ""
    };
  },
  mounted() {
    this.bus = this.buses.find(b => b.id === this.horario.id_bus);
  },
  props: ["horario", "buses", "active"],
  methods: {
    chooseBus() {
      this.$emit("picked", this.horario.id_bus);
    }
  }
};
</script>

<style>
</style>