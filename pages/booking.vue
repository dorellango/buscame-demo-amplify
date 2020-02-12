<template>
  <div>
    <div class="border-b border-dashed border-gray-300 py-4 mb-8">
      <h1 class="text-2xl text-gray-800 mr-2">Booking</h1>
    </div>
    <div class="md:flex -mx-2 block">
      <div class="w-full md:w-1/3 px-2 mb-16">
        <h3
          class="text-center text-gray-600 tracking-wider text-lg mb-4 flex items-center justify-center"
        >
          <p
            class="mr-2 bg-indigo-700 text-indigo-100 h-8 w-8 rounded-full flex items-center justify-center"
          >
            1
          </p>
          Viaje
        </h3>
        <div class="bg-white border rounded px-4 py-6">
          <!-- Pasajero Select-->
          <label
            class="uppercase text-xs text-gray-700 font-bold mb-1"
            for="id_pasajero"
            >pasajero</label
          >
          <select
            v-model="form.id_pasajero"
            class="mb-2 appearance-none bg-gray-200 border-2 border-gray-200 rounded px-4 py-1 text-gray-700 block w-full focus:outline-none focus:border-indigo-600"
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
          <!-- Trayecto Select-->
          <label
            class="uppercase text-xs text-gray-700 font-bold mb-1"
            for="id_pasajero"
            >trayecto</label
          >
          <select
            v-model="form.id_trayecto"
            @input="updateBusesAndHorarios"
            class="mb-4 appearance-none bg-gray-200 border-2 border-gray-200 rounded px-4 py-1 text-gray-700 block w-full focus:outline-none focus:border-indigo-600"
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
          <!-- Trayecto -->
          <trayecto-card
            v-if="form.id_trayecto"
            :trayecto="trayectos.find(t => t.id === form.id_trayecto)"
            :btn-horarios="false"
            :deletable="false"
            :is-column="true"
          ></trayecto-card>
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
        <p
          v-show="itExistASeatForPassanger"
          class="mt-2 bg-yellow-200 border border-dashed border-yellow-300 border-yellow-500 flex font-bold items-center justify-center mb-4 p-4 rounded text-center text-yellow-700 tracking-wider"
        >
          Ya existe un asiento reservado para este pasajero en el trayecto
          seleccionado
        </p>
      </div>
      <div class="w-full md:w-1/3 px-2 mb-16">
        <!-- Buses -->
        <h3
          class="text-center text-gray-600 tracking-wider text-lg mb-4 flex items-center justify-center"
        >
          <p
            class="mr-2 bg-indigo-700 text-indigo-100 h-8 w-8 rounded-full flex items-center justify-center"
          >
            2
          </p>
          Selecciona el <strong class="ml-1"> BUS</strong>
        </h3>
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
          class="bg-yellow-200 border border-dashed border-yellow-300 border-yellow-500 flex font-bold items-center justify-center mb-4 p-4 rounded text-center text-yellow-700 tracking-wider"
        >
          No hay buses asignados para este trayecto
        </p>
      </div>
      <div class="w-full md:w-1/3 px-2 mb-16">
        <!-- Asientos -->
        <h3
          class="text-center text-gray-600 tracking-wider text-lg mb-4 flex items-center justify-center"
        >
          <p
            class="mr-2 bg-indigo-700 text-indigo-100 h-8 w-8 rounded-full flex items-center justify-center"
          >
            3
          </p>
          Selecciona el <strong class="ml-1"> asiento</strong>
        </h3>
        <div
          :class="
            form.id_bus === '' || itExistASeatForPassanger
              ? 'opacity-50 pointer-events-none'
              : ''
          "
        >
          <div class="text-center">
            <p
              class="text-xs bg-gray-400 font-mono p-2 rounded-t tracking-wider font-bold"
            >
              FRENTE
            </p>
            <div
              class="flex flex-wrap bg-gray-200 p-4 border border-200 rounded"
            >
              <bus-seat
                v-for="(n, index) in 10"
                :key="index"
                :number="n"
                @chosed="busSeatChosed"
                :chosed="form.num_asiento === n"
                :active="
                  asientos.some(
                    a => a.num_asiento === n && a.id_bus === form.id_bus
                  )
                "
                class="w-1/2 text-center py-8"
              ></bus-seat>
            </div>
            <p
              class="text-xs bg-gray-400 font-mono p-2 rounded-b tracking-wider font-bold"
            >
              ATRÁS
            </p>
          </div>
        </div>
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
      this.form.id_bus = "";
      this.fetchBuses();
      this.fetchHorarios();
    },
    updateBus(id) {
      this.form.id_bus = id;
      this.fetchAsientos();
      this.asientos = this.asientos.filter(a => a.id_bus === id);
    },
    busSeatChosed(seat) {
      this.form.num_asiento = seat;
    },
    async book() {
      try {
        const { data } = await this.$axios.post("/asiento", this.form);

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