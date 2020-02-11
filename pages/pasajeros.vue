<template>
  <div class="container mx-auto">
    <div
      class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8"
    >
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Pasajeros</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="pasajeros.length"
        ></p>
      </div>
      <button
        type="button"
        @click="$modal.show('pasajero-add')"
        class="btn-indigo"
      >
        Ingresar
      </button>
      <modal-add-pasajero @added="updateList"></modal-add-pasajero>
    </div>
    <transition-group name="fade" tag="div">
      <pasajero-card
        v-for="pasajero in pasajeros"
        :key="pasajero.id"
        :pasajero="pasajero"
        @destroy="destroy"
      ></pasajero-card>
    </transition-group>
  </div>
</template>

<script>
import PasajeroCard from "~/components/PasajeroCard";
import ModalAddPasajero from "~/components/ModalAddPasajero";

export default {
  async asyncData({ $axios }) {
    const pasajeros = await $axios.$post("/pasajero/all");

    return { pasajeros };
  },
  methods: {
    async updateList() {
      const { data } = await this.$axios.post("/pasajero/all");
      this.pasajeros = data;
    },
    async destroy({ id }) {
      try {
        await this.$axios.delete(`/pasajero/${id}`);
        this.removePasajero(id);
        this.$vToastify.info("Pasajero eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    removePasajero(id) {
      const { pasajeros } = this;
      pasajeros.splice(
        pasajeros.findIndex(c => c.id === id),
        1
      );
    }
  },
  components: { PasajeroCard, ModalAddPasajero }
};
</script>

<style>
</style>