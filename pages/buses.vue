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
      <!-- Modal Bus -->
      <modal-add-bus></modal-add-bus>
    </div>
    <!-- Buses -->
    <transition-group name="fade" class="block md:flex flex-wrap">
      <bus-card
        v-for="bus in buses"
        :key="bus.id"
        :bus="bus"
        @destroy="destroy"
      ></bus-card>
    </transition-group>
  </div>
</template>

<script>
import BusCard from "~/components/BusCard";
import ModalAddBus from "~/components/ModalAddBus";

export default {
  async fetch({ store }) {
    try {
      await store.dispatch("buses/get");
      await store.dispatch("choferes/get");
      await store.dispatch("horarios/get");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async destroy(bus) {
      if (this.isThereAnSchedule(bus.id)) {
        return this.$vToastify.warning(
          "Existe un horario asociado a este bus",
          "Imposible!"
        );
      }
      try {
        await this.$axios.delete(`/bus/${bus.id}`);
        this.$store.commit("buses/remove", bus);
        this.$vToastify.info("Bus eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    isThereAnSchedule(id) {
      return this.$store.state.horarios.list.some(h => h.id_bus === id);
    }
  },
  components: { BusCard, ModalAddBus },
  computed: {
    buses() {
      return this.$store.state.buses.list;
    }
  }
};
</script>

<style>
</style>