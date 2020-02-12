<template>
  <div class="container mx-auto">
    <div
      class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8"
    >
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Choferes</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="choferes.length"
        ></p>
      </div>
      <button @click="$modal.show('chofer-add')" class="btn-indigo">
        Ingresar
      </button>
      <modal-add-chofer
        ref="modalAddChofer"
        @added="updateList"
      ></modal-add-chofer>
    </div>
    <!-- Choferes -->
    <transition-group name="fade" tag="div">
      <chofer-card
        v-for="chofer in choferes"
        :key="chofer.id"
        :chofer="chofer"
        @destroy="destroy"
      ></chofer-card>
    </transition-group>
  </div>
</template>

<script>
import ChoferCard from "~/components/ChoferCard";
import ModalAddChofer from "~/components/ModalAddChofer";

export default {
  async asyncData({ $axios }) {
    try {
      const buses = await $axios.$post("/bus/all");
      const choferes = await $axios.$post("/chofer/all");

      return { choferes, buses };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async updateList() {
      try {
        const { data } = await this.$axios.post("/chofer/all");
        this.choferes = data;
      } catch (error) {
        console.log(error);
      }
    },
    async destroy({ id }) {
      if (this.choferes.some(c => c.id === id)) {
        return this.$vToastify.error(
          "No puedes eliminar choferes con buses asignados",
          "Nope!"
        );
      }
      try {
        await this.$axios.delete(`/chofer/${id}`);
        this.removeChofer(id);
        this.$vToastify.info("Chofer eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    removeChofer(id) {
      const { choferes } = this;
      choferes.splice(
        choferes.findIndex(c => c.id === id),
        1
      );
    }
  },
  components: { ChoferCard, ModalAddChofer }
};
</script>

<style>
</style>