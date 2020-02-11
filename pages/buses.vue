<template>
  <div class="container mx-auto">
    <div
      class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8"
    >
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Buses</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="buses.length"
        ></p>
      </div>
      <button @click="$modal.show('bus-add')" class="btn-indigo">
        Ingresar
      </button>
    </div>
    <!-- Buses -->
    <transition-group name="fade" class="flex flex-wrap">
      <bus-card
        v-for="bus in buses"
        :key="bus.id"
        :bus="bus"
        :choferes="choferes"
        @destroy="destroy"
      ></bus-card>
    </transition-group>
    <!-- Bus -->
    <modal name="bus-add" height="auto" :scrollable="true">
      <div class="p-4 text-center bg-gray-200">
        <h1 class="text-lg font-bold text-gray-700">Ingreso Bus</h1>
      </div>
      <form @submit.prevent="add">
        <!-- @keydown.enter="add" -->
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
          <button type="submit" class="btn-indigo-o">Guardar</button>
          <button
            type="button"
            class="btn-default"
            @click="$modal.hide('bus-add')"
          >
            Cerrar
          </button>
        </div>
      </form>
    </modal>
    <!-- Bus -->
  </div>
</template>

<script>
import BusCard from "~/components/BusCard";

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
  async asyncData({ $axios }) {
    const buses = await $axios.$post("/bus/all");
    const choferes = await $axios.$post("/chofer/all");

    return { buses, choferes };
  },
  methods: {
    async updateList() {
      const { data } = await this.$axios.post("/bus/all");

      this.buses = data;
    },
    reset() {
      Object.keys(this.form).map(k => (this.form[k] = ""));
    },
    async add() {
      try {
        await this.$axios.post("/bus", this.form);
        this.reset();
        this.updateList();
        this.$vToastify.success("Bus agregado exitósamente 😄", "¡Hecho!");
        this.$modal.hide("bus-add");
      } catch (error) {
        console.error("Something goes wrong", error);
      }
    },
    removeBus(id) {
      const { buses } = this;
      buses.splice(
        buses.findIndex(c => c.id === id),
        1
      );
    },
    async destroy({ id }) {
      await this.$axios.delete(`/bus/${id}`);

      this.removeBus(id);
      this.$vToastify.info("Bus eliminado exitósamente 😢", "¡Hecho!");
    }
  },
  components: { BusCard }
};
</script>

<style>
</style>