<template>
  <modal name="bus-add" height="auto" :scrollable="true" :adaptive="true">
    <div class="p-4 text-center bg-gray-200">
      <h1 class="text-lg font-bold text-gray-700">Ingreso Bus</h1>
    </div>
    <form @submit.prevent="add">
      <div class="px-4 py-6">
        <input-form
          v-model="form.patente"
          class="mb-2"
          label="patente"
          name="patente"
          type="text"
          placeholder="LKAS12"
          :required="true"
        ></input-form>
        <input-form
          v-model="form.marca"
          class="mb-2"
          label="marca"
          name="marca"
          type="text"
          placeholder="Renault"
          :required="true"
        ></input-form>
        <!-- Choferes -->
        <div class="mb-2">
          <label
            class="uppercase text-xs text-gray-700 font-bold mb-1"
            for="id_chofer"
            >chofer</label
          >
          <select
            v-model="form.id_chofer"
            class="appearance-none bg-gray-200 border-2 border-gray-200 rounded px-4 py-1 text-gray-700 block w-full focus:outline-none focus:border-indigo-600"
            name="id_chofer"
          >
            <option value="" disabled>-- --</option>
            <option
              v-for="chofer in choferes"
              :key="chofer.id"
              :value="chofer.id"
              v-text="`${chofer.nombre} ${chofer.apellido}`"
            ></option>
          </select>
        </div>
      </div>
      <div class="p-4 bg-gray-200 flex">
        <button
          type="submit"
          class="btn-indigo-o"
          :class="canSubmit ? '' : 'pointer-events-none opacity-50'"
        >
          Guardar
        </button>
        <button type="button" class="btn-default" @click="hide()">
          Cerrar
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
export default {
  data() {
    return {
      form: {
        patente: "",
        marca: "",
        id_chofer: ""
      }
    };
  },
  methods: {
    async add() {
      try {
        await this.$axios.post("/bus", this.form);
        await this.$store.dispatch("buses/get");
        this.reset();
        this.hide();
        this.$vToastify.success("Bus agregado exitósamente 😄", "¡Hecho!");
      } catch (error) {
        console.error(error);
      }
    },
    reset() {
      Object.keys(this.form).map(k => (this.form[k] = ""));
    },
    hide() {
      this.$modal.hide("bus-add");
    }
  },
  computed: {
    canSubmit() {
      return Object.keys(this.form).every(k => this.form[k] !== "");
    },
    choferes() {
      return this.$store.state.choferes.list;
    }
  }
};
</script>