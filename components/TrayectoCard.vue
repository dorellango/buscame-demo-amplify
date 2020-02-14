<template>
  <div class="items-center mb-4" :class="isColumn ? 'block' : 'block md:flex'">
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
      <div class="mr-auto">
        <p class="mb-1 text-xs text-indigo-300">Retorno:</p>
        <p>{{ trayecto.vuelta }}</p>
      </div>
      <!-- Horarios -->
      <div class="flex items-center">
        <button
          v-show="btnHorarios"
          class="bg-indigo-200 hover:bg -indigo-100 px-3 py-1 rounded-full flex items-center justify-center text-indigo-600 hover:text-indigo-500 focus:outline-none mr-2"
          @click="$emit('schedule', trayecto)"
        >
          <p class="text-xs font-mono" v-text="totalHorarios"></p>
          <svg
            class="fill-current ml-1 h-5 w-5"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"
            />
          </svg>
        </button>
      </div>

      <!-- Destroy -->
      <button
        v-show="deletable"
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
  props: {
    trayecto: {
      type: Object
    },
    deletable: {
      type: Boolean,
      default: true
    },
    btnHorarios: {
      type: Boolean,
      default: true
    },
    isColumn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    totalHorarios() {
      return this.$store.state.horarios.list.filter(
        h => h.id_trayecto === this.trayecto.id
      ).length;
    }
  }
};
</script>

<style>
</style>