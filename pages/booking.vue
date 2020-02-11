<template>
  <div>
    <div class="border-b border-dashed border-gray-300 py-4 mb-8">
      <h1 class="text-2xl text-gray-800 mr-2">Booking</h1>
    </div>
    <div class="md:flex block mb-6">
      <div class="w-full md:w-1/2 px-2">
        <!-- Pasajero Select-->
        <label
          class="uppercase text-xs text-gray-700 font-bold mb-1"
          for="id_pasajero"
          >pasajero</label
        >
        <select
          v-model="form.id_pasajero"
          class="appearance-none bg-gray-200 border-2 border-gray-200 rounded px-4 py-1 text-gray-700 block w-full focus:outline-none focus:border-indigo-600"
          name="id_pasajero"
        >
          <option value="" disabled>-- --</option>
          <option
            v-for="pasajero in pasajeros"
            :key="pasajero.id"
            :value="pasajero.id"
            v-text="`${pasajero.nombre} ${pasajero.apellido}`"
          ></option>
        </select>
      </div>

      <div class="w-full md:w-1/2 px-2">
        <!-- Trayecto Select-->
        <label
          class="uppercase text-xs text-gray-700 font-bold mb-1"
          for="id_pasajero"
          >trayecto</label
        >
        <select
          v-model="form.id_trayecto"
          @input="updateBusesAndHorarios"
          class="appearance-none bg-gray-200 border-2 border-gray-200 rounded px-4 py-1 text-gray-700 block w-full focus:outline-none focus:border-indigo-600"
          name="id_trayecto"
        >
          <option value="" disabled>-- --</option>
          <option
            v-for="trayecto in trayectos"
            :key="trayecto.id"
            :value="trayecto.id"
            v-text="`${trayecto.terminal}`"
          ></option>
        </select>
      </div>
    </div>

    <!-- Trayectos -->
    <div class="px-2">
      <trayecto-card
        v-if="form.id_trayecto"
        :trayecto="trayectos.find(t => t.id === form.id_trayecto)"
        :btn-horarios="false"
        :deletable="false"
      ></trayecto-card>
    </div>

    <div class="block md:flex mb-4">
      <!-- Horario/Bus Select -->
      <div class="w-full md:w-1/2">
        <booking-bus-list-item
          v-for="horario in horarios"
          :key="horario.id"
          :horario="horario"
          :buses="buses"
          :active="form.id_bus === horario.id_bus"
          @picked="updateBus"
        ></booking-bus-list-item>
        <p
          v-show="horarios.length === 0 && this.form.id_trayecto"
          class="bg-yellow-200 text-yellow-700 tracking-wider font-bold p-4 rounded border border-yellow-300"
        >
          No hay buses asignados para este trayecto
        </p>
      </div>
      <!-- Asientos -->
      <div
        class="w-full md:w-1/2"
        :class="
          form.id_bus === '' || itExistASeatForPassanger
            ? 'opacity-50 pointer-events-none'
            : ''
        "
      >
        <div class="text-center px-2">
          <p class="bg-gray-400 text-lg font-mono p-2 rounded-t">FRENTE</p>
          <div class="flex flex-wrap bg-gray-200 p-4">
            <bus-seat
              v-for="(n, index) in 10"
              :key="index"
              :number="n"
              @chosed="form.num_asiento = n"
              :active="
                form.num_asiento === n ||
                  asientos.some(
                    a => a.num_asiento === n && a.id_bus === form.id_bus
                  )
              "
              class="w-1/2 text-center"
            ></bus-seat>
          </div>
          <p class="bg-gray-400 text-lg font-mono p-2 rounded-b">ATRÁS</p>
        </div>
      </div>
    </div>
    <div class="block md:flex justify-end">
      <div class="px-2 w-full md:w-1/2">
        <p
          v-show="itExistASeatForPassanger"
          class="bg-yellow-200 text-yellow-700 tracking-wider font-bold p-4 rounded border border-yellow-300 mb-4"
        >
          Ya existe un asiento reservado para este pasajero en el trayecto
          seleccionado
        </p>
        <!-- Book -->
        <button
          type="button"
          @click="book"
          class="btn-indigo w-full focus:outline-none"
          :class="canSubmit ? '' : 'opacity-25 pointer-events-none'"
        >
          Book
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BusSeat from "~/components/BusSeat";
import TrayectoCard from "~/components/TrayectoCard";
import BookingBusListItem from "~/components/BookingBusListItem";
import { isSameDay } from "date-fns";

export default {
  data() {
    return {
      buses: [],
      horarios: [],
      form: {
        id_trayecto: "",
        id_bus: "",
        id_pasajero: "",
        num_asiento: ""
      }
    };
  },

  async asyncData({ $axios }) {
    const trayectos = await $axios.$post("/trayecto/all");
    const asientos = await $axios.$post("/asiento/all");
    const pasajeros = await $axios.$post("/pasajero/all");

    return { trayectos, asientos, pasajeros };
  },
  methods: {
    updateBusesAndHorarios() {
      this.fetchBuses();
      this.fetchHorarios();
    },
    updateBus(id) {
      this.form.id_bus = id;
      this.fetchAsientos();
      this.asientos = this.asientos.filter(a => a.id_bus === id);
    },
    async book() {
      try {
        const { data } = await this.$axios.post("/asiento");

        this.reset();

        this.$vToastify.success("Reserva creada con éxito", "Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    reset() {
      this.form.num_asiento = "";
      this.form.id_trayecto = "";
      this.form.id_bus = "";
      this.form.id_pasajero = "";
      this.asientos = [];
      this.horarios = [];
    },
    async fetchBuses() {
      const { data: buses } = await this.$axios.post("/bus/all");
      this.buses = buses;
    },
    async fetchAsientos() {
      const { data: asientos } = await this.$axios.post("/asiento/all");
      this.asientos = asientos;
    },
    async fetchHorarios() {
      const { data: horarios } = await this.$axios.post("/horario/all");

      this.horarios = horarios.filter(
        h => h.id_trayecto === this.form.id_trayecto
      );
    }
  },
  components: { BusSeat, TrayectoCard, BookingBusListItem },
  computed: {
    canSubmit() {
      return Object.keys(this.form).every(f => this.form[f] !== "");
    },
    itExistASeatForPassanger() {
      return this.asientos.some(
        a =>
          a.id_bus === this.form.id_bus &&
          a.id_pasajero === this.form.id_pasajero
      );
    }
  }
};
</script>

<style>
</style>