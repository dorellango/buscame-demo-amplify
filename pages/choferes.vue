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
      <modal-add-chofer></modal-add-chofer>
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
  async fetch({ store }) {
    try {
      await store.dispatch("choferes/get");
      await store.dispatch("buses/get");
      await store.dispatch("horarios/get");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async destroy(chofer) {
      if (this.buses.some(b => b.id_chofer === chofer.id)) {
        return this.$vToastify.error(
          "No puedes eliminar choferes con buses asignados",
          "Nope!"
        );
      }
      try {
        await this.$axios.delete(`/chofer/${chofer.id}`);
        this.$store.commit("choferes/remove", chofer);
        this.$vToastify.info("Chofer eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: { ChoferCard, ModalAddChofer },
  computed: {
    choferes() {
      return this.$store.state.choferes.list;
    },
    buses() {
      return this.$store.state.buses.list;
    }
  }
};
</script>

<style>
</style>