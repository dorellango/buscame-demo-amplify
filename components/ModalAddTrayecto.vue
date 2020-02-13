<template>
  <!-- Add Trayecto -->
  <modal name="trayecto-add" height="auto" :scrollable="true" :adaptive="true">
    <div class="p-4 text-center bg-gray-200">
      <h1 class="text-lg font-bold text-gray-700">Ingreso Trayecto</h1>
    </div>
    <form @submit.prevent="add">
      <div class="px-4 py-6">
        <input-form
          v-model="form.ida"
          class="mb-2"
          label="ida"
          name="ida"
          type="text"
          placeholder="Santiago"
          :required="true"
        ></input-form>
        <input-form
          v-model="form.vuelta"
          class="mb-2"
          label="vuelta"
          name="vuelta"
          type="text"
          placeholder="Valparaiso"
          :required="true"
        ></input-form>
        <input-form
          v-model="form.terminal"
          class="mb-2"
          label="terminal"
          name="terminal"
          type="text"
          placeholder="Colon"
          :required="true"
        ></input-form>
      </div>
      <div class="p-4 bg-gray-200 flex">
        <button
          type="submit"
          class="btn-indigo-o"
          :class="canSubmit ? '' : 'pointer-events-none opacity-50'"
        >
          Guardar
        </button>
        <button
          type="button"
          class="btn-default"
          @click="$modal.hide('trayecto-add')"
        >
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
        ida: "",
        vuelta: "",
        terminal: ""
      }
    };
  },
  methods: {
    async add() {
      try {
        await this.$axios.post("/trayecto", this.form);
        this.reset();
        this.$vToastify.success("Trayecto agregado exitósamente 😄", "¡Hecho!");
        this.$emit("added");
        this.$modal.hide("trayecto-add");
      } catch (error) {
        console.error("Something goes wrong");
      }
    },
    reset() {
      this.form.ida = "";
      this.form.vuelta = "";
      this.form.terminal = "";
    }
  },
  computed: {
    canSubmit() {
      return Object.keys(this.form).every(f => this.form[f] !== "");
    }
  }
};
</script>

<style>
</style>