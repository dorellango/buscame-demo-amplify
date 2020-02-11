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
    const buses = await $axios.$post("/bus/all");
    const choferes = await $axios.$post("/chofer/all");

    return { buses, choferes };
  },
  methods: {
    async updateList() {
      const { data } = await this.$axios.post("/bus/all");
      this.buses = data;
    },
    removeBus(id) {
      const { buses } = this;
      buses.splice(
        buses.findIndex(c => c.id === id),
        1
      );
    },
    async destroy({ id }) {
      try {
        await this.$axios.delete(`/bus/${id}`);

        this.removeBus(id);
        this.$vToastify.info("Bus eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: { BusCard, ModalAddBus }
};
</script>

<style>
</style>