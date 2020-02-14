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
      <modal-add-trayecto></modal-add-trayecto>
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
  async fetch({ store }) {
    try {
      await store.dispatch("trayectos/get");
      await store.dispatch("horarios/get");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async destroy(trayecto) {
      if (this.isThereAnSchedule(trayecto.id)) {
        return this.$vToastify.warning(
          "Existe un horario asociado a este trayecto",
          "Imposible!"
        );
      }
      try {
        await this.$axios.delete(`/trayecto/${trayecto.id}`);
        this.$store.commit("trayectos/remove", trayecto);
        this.$vToastify.info("Trayecto eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    isThereAnSchedule(id) {
      return this.$store.state.horarios.list.some(h => h.id_trayecto === id);
    }
  },
  components: { TrayectoCard, ModalHorarios, ModalAddTrayecto },
  computed: {
    trayectos() {
      return this.$store.state.trayectos.list;
    }
  }
};
</script>

<style>
</style>