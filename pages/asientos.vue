<template>
  <div class="container mx-auto">
    <div
      class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8"
    >
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Asientos</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="asientos.length"
        ></p>
      </div>
    </div>
    <transition-group name="fade" tag="div">
      <asiento-card
        v-for="asiento in asientos"
        :key="asiento.id"
        :bus="buses.find(b => b.id === asiento.id_bus)"
        :asiento="asiento"
        @destroy="destroy"
      ></asiento-card>
    </transition-group>
    <!-- Add Pasajero -->
  </div>
</template>

<script>
import AsientoCard from "~/components/AsientoCard";

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
  async asyncData({ $axios }) {
    const asientos = await $axios.$post("/asiento/all");
    const buses = await $axios.$post("/bus/all");

    return { asientos, buses };
  },
  methods: {
    async destroy({ id }) {
      try {
        await this.$axios.delete(`/asiento/${id}`);
        this.removeAsiento(id);
        this.$vToastify.info(
          "Asiento/reservación eliminado exitósamente 😢",
          "¡Hecho!"
        );
      } catch (error) {
        console.log(error);
      }
    },
    removeAsiento(id) {
      const { asientos } = this;
      asientos.splice(
        asientos.findIndex(c => c.id === id),
        1
      );
    }
  },
  components: { AsientoCard }
};
</script>

<style>
</style>