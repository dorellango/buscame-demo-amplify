<template>
  <div class="container mx-auto">
    <div
      class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8"
    >
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Trayectos</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="trayectos.length"
        ></p>
      </div>
      <button @click="$modal.show('trayecto-add')" class="btn-indigo">
        Ingresar
      </button>
      <modal-add-trayecto
        ref="modalAddTrayecto"
        @added="updateList"
      ></modal-add-trayecto>
    </div>
    <!-- Trayectos -->
    <transition-group name="fade" tag="div">
      <trayecto-card
        class="shadow-md rounded"
        v-for="trayecto in trayectos"
        :key="trayecto.id"
        :trayecto="trayecto"
        @destroy="destroy"
        @schedule="$refs.modalHorarios.show(trayecto)"
        :deletable="true"
      ></trayecto-card>
    </transition-group>
    <modal-horarios ref="modalHorarios"></modal-horarios>
  </div>
</template>

<script>
import TrayectoCard from "~/components/TrayectoCard";
import ModalHorarios from "~/components/ModalHorarios";
import ModalAddTrayecto from "~/components/ModalAddTrayecto";

export default {
  data() {
    return {
      horarios: []
    };
  },
  async asyncData({ $axios }) {
    try {
      const trayectos = await $axios.$post("/trayecto/all");
      return { trayectos };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async destroy({ id }) {
      try {
        await this.$axios.delete(`/trayecto/${id}`);
        this.removeTrayecto(id);
        this.$vToastify.info("Trayecto eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    async updateList() {
      const { data } = await this.$axios.post("/trayecto/all");
      this.trayectos = data;
    },
    removeTrayecto(id) {
      const { trayectos } = this;
      trayectos.splice(
        trayectos.findIndex(c => c.id === id),
        1
      );
    }
  },
  components: { TrayectoCard, ModalHorarios, ModalAddTrayecto }
};
</script>

<style>
</style>