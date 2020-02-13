<template>
  <modal name="chofer-add" height="auto" :scrollable="true" :adaptive="true">
    <div class="p-4 text-center bg-gray-200">
      <h1 class="text-lg font-bold text-gray-700">Ingreso Chofer</h1>
    </div>
    <form @submit.prevent="add">
      <div class="px-4 py-6">
        <input-form
          v-model="form.nombre"
          class="mb-2"
          label="nombre"
          name="text"
          type="text"
          placeholder="Jhon"
          :required="true"
        ></input-form>
        <input-form
          v-model="form.apellido"
          class="mb-2"
          label="apellido"
          name="apellido"
          type="text"
          placeholder="Doe"
          :required="true"
        ></input-form>
        <input-rut
          v-model="form.rut"
          class="mb-2 font-mono"
          label="rut"
          name="rut"
          type="text"
          placeholder="11.111.111-1"
          :required="true"
        ></input-rut>
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
          @click="$modal.hide('chofer-add')"
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
        nombre: "",
        apellido: "",
        rut: ""
      }
    };
  },
  methods: {
    async add() {
      try {
        await this.$axios.post("/chofer", this.form);
        await this.$store.dispatch("choferes/get");
        this.reset();
        this.hide();
        this.$vToastify.success("Chofer agregado exitósamente 😄", "¡Hecho!");
      } catch (error) {
        console.error(error);
      }
    },
    hide() {
      this.$modal.hide("chofer-add");
    },
    reset() {
      this.form.nombre = "";
      this.form.apellido = "";
      this.form.rut = "";
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