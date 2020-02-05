<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8">
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Pasajeros</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="pasajeros.length"
        ></p>
      </div>
      <button class="btn-indigo">Ingresar</button>
    </div>
    <pasajero-card v-for="pasajero in pasajeros" :key="pasajero.id" :pasajero="pasajero"></pasajero-card>
  </div>
</template>

<script>
import PasajeroCard from "~/components/PasajeroCard";

export default {
  data() {
    return {
      pasajeros: [
        {
          id: 1,
          nombre: "Jose",
          apellido: "Angel",
          rut: "17467125-1"
        }
      ]
    };
  },
  components: { PasajeroCard }
};
</script>

<style>
</style>