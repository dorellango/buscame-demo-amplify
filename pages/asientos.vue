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
        :asiento="asiento"
        @destroy="destroy"
      ></asiento-card>
    </transition-group>
  </div>
</template>

<script>
import AsientoCard from "~/components/AsientoCard";

export default {
  async fetch({ store }) {
    try {
      await store.dispatch("buses/get");
      await store.dispatch("asientos/get");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async destroy(asiento) {
      try {
        await this.$axios.delete(`/asiento/${asiento.id}`);
        this.$store.commit("asientos/remove", asiento);
        this.$vToastify.info(
          "Asiento/reservación eliminado exitósamente 😢",
          "¡Hecho!"
        );
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: { AsientoCard },
  computed: {
    asientos() {
      return this.$store.state.asientos.list;
    }
  }
};
</script>