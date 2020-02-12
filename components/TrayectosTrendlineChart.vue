<template>
  <div></div>
</template>

<script>
import { GoogleCharts } from "google-charts";

export default {
  data() {
    return {};
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { data: trayectos } = await this.$axios.post("/trayecto/all");
      const { data: asientos } = await this.$axios.post("/asiento/all");
      const { data: buses } = await this.$axios.post("/bus/all");
      const { data: horarios } = await this.$axios.post("/horario/all");

      this.trayectos = trayectos;
      this.asientos = asientos;
      this.horarios = horarios;
      this.buses = buses;
      this.buildChart();
    },
    buildChart() {
      const trayectosPasajeros = this.trayectos.map(t => {
        const horariosBusesTrayecto = this.horarios
          .filter(h => h.id_trayecto === t.id)
          .map(h => h.id_bus);

        const asientosTrayecto = this.asientos.filter(a =>
          horariosBusesTrayecto.includes(a.id_bus)
        );

        return [`${t.terminal}`, asientosTrayecto.length];
      });

      const avg = this.asientos.length / this.trayectos.length;

      GoogleCharts.load(() => {
        const chartData = GoogleCharts.api.visualization.arrayToDataTable([
          ["Trayecto", "Pasajeros"],
          ...trayectosPasajeros
        ]);

        const options = {
          hAxis: { title: "Trayectos" },
          vAxis: { title: "Pasajeros" },
          title: `avg ${avg}`,
          trendlines: {
            0: {
              type: "exponential",
              pointSize: 20,
              opacity: 0.6,
              pointsVisible: false
            },
            1: {
              type: "linear",
              pointSize: 10,
              pointsVisible: true
            }
          }
        };
        const chart = new GoogleCharts.api.visualization.ColumnChart(this.$el);
        chart.draw(chartData, options);
      });
    }
  }
};
</script>

<style>
</style>