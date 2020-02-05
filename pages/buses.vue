<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8">
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Buses</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="buses.length"
        ></p>
      </div>
      <button class="btn-indigo">Ingresar</button>
    </div>
    <bus-card v-for="bus in buses" :key="bus.id" :bus="bus"></bus-card>
  </div>
</template>

<script>
import BusCard from "~/components/BusCard";

export default {
  data() {
    return {
      buses: [
        {
          patente: "JK-7682",
          marca: "Subaru",
          id_chofer: 1
        },
        {
          patente: "JK-6723",
          marca: "Mercedez Benz",
          id_chofer: 2
        }
      ]
    };
  },
  components: { ChoferCard }
};
</script>

<style>
</style>