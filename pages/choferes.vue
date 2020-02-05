<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8">
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Choferes</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="choferes.length"
        ></p>
      </div>
      <button class="btn-indigo">Ingresar</button>
    </div>
    <chofer-card v-for="chofer in choferes" :key="chofer.id" :chofer="chofer"></chofer-card>
  </div>
</template>

<script>
import ChoferCard from "~/components/ChoferCard";

export default {
  data() {
    return {
      choferes: [
        {
          apellido: "juan",
          id: 1,
          nombre: "felipe",
          rut: "15291252-K"
        },
        {
          apellido: "antonia",
          id: 2,
          nombre: "maria",
          rut: "1292252-3"
        }
      ]
    };
  },
  components: { ChoferCard }
};
</script>

<style>
</style>