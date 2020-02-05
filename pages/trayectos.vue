<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8">
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Trayectos</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="trayectos.length"
        ></p>
      </div>
      <button class="btn-indigo">Ingresar</button>
    </div>
    <trayecto-card v-for="trayecto in trayectos" :key="trayecto.id" :trayecto="trayecto"></trayecto-card>
  </div>
</template>

<script>
import TrayectoCard from "~/components/TrayectoCard";

export default {
  data() {
    return {
      trayectos: [
        {
          id: 1,
          ida: "Valparaiso",
          vuelta: "Santiago",
          terminal: "San Borja"
        },
        {
          id: 2,
          ida: "Valparaiso",
          vuelta: "Puerto Montt",
          terminal: "Colón"
        }
      ]
    };
  },
  components: { TrayectoCard }
};
</script>

<style>
</style>