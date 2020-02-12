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
      <modal-add-bus :choferes="choferes" @added="updateList"></modal-add-bus>
    </div>
    <!-- Buses -->
    <transition-group name="fade" class="block md:flex flex-wrap">
      <bus-card
        v-for="bus in buses"
        :key="bus.id"
        :bus="bus"
        :choferes="choferes"
        @destroy="destroy"
      ></bus-card>
    </transition-group>
  </div>
</template>

<script>
import BusCard from "~/components/BusCard";
import ModalAddBus from "~/components/ModalAddBus";

export default {
  async asyncData({ $axios }) {
    try {
      const buses = await $axios.$post("/bus/all");
      const choferes = await $axios.$post("/chofer/all");
      const horarios = await $axios.$post("/horario/all");

      return { buses, choferes, horarios };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async updateList() {
      try {
        const { data } = await this.$axios.post("/bus/all");
        this.buses = data;
      } catch (error) {
        console.log(error);
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
      if (this.isThereAnSchedule(id)) {
        return this.$vToastify.warning(
          "Existe un horario asociado a este bus",
          "Imposible!"
        );
      }
      try {
        await this.$axios.delete(`/bus/${id}`);

        this.removeBus(id);
        this.$vToastify.info("Bus eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    isThereAnSchedule(id) {
      return this.horarios.some(h => h.id_bus === id);
    }
  },
  components: { BusCard, ModalAddBus }
};
</script>

<style>
</style>