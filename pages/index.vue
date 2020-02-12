<template>
  <div class="container mx-auto pt-8">
    <div class="shadow-lg rounded-lg overflow-hidden p-6 bg-white">
      <h3
        class="text-lg mb-2 tracking-wider text-gray-700 bg-gray-200 rounded px-2 py-2 text-center"
      >
        <strong>Pasajeros</strong> / Trayectos
      </h3>
      <trayectos-trendline-chart></trayectos-trendline-chart>
    </div>
  </div>
</template>

<script>
import TrayectosTrendlineChart from "~/components/TrayectosTrendlineChart";

export default {
  components: { TrayectosTrendlineChart }
};
</script>

<style>
</style>