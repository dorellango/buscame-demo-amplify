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
            :trayecto="choosedTrayecto"
            :btn-horarios="false"
            :deletable="false"
            :is-column="true"
          ></trayecto-card>
          <!-- Book -->
          <button
            type="button"
            @click="book"
            class="hidden md:block btn-indigo w-full focus:outline-none"
            :class="canSubmit ? '' : 'opacity-25 pointer-events-none'"
          >
            Reservar
          </button>
        </div>
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
          v-for="horario in horariosTrayecto"
          :key="horario.id"
          :horario="horario"
          :active="form.id_bus === horario.id_bus"
          @picked="updateBus"
        ></booking-bus-list-item>
        <p
          v-show="horariosTrayecto.length === 0 && this.form.id_trayecto"
          class="bg-yellow-200 border border-dashed border-yellow-300 border-yellow-500 font-bold mb-4 p-4 rounded text-center text-yellow-700 tracking-wider"
        >
          No hay buses asignados para este trayecto.
          <a
            href.prevent="#"
            @click="$refs.modalHorarios.show(choosedTrayecto)"
            class="underline text-indigo-700 cursor-pointer"
            >Asignar uno</a
          >
        </p>
        <modal-horarios ref="modalHorarios"></modal-horarios>
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
        <p
          v-show="itExistASeatForPassanger"
          class="mt-2 bg-yellow-200 border border-dashed border-yellow-300 border-yellow-500 font-bold mb-4 p-4 rounded text-center text-yellow-700 tracking-wider"
        >
          Ya existe un asiento reservado para este pasajero en el trayecto
          seleccionado
        </p>
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
                @picked="busSeatpicked(n)"
                :picked="form.num_asiento === n"
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
          <!-- Book -->
          <button
            type="button"
            @click="book"
            class="md:hidden btn-indigo w-full focus:outline-none mt-4 pt-4"
            :class="canSubmit ? '' : 'opacity-25 pointer-events-none'"
          >
            Reservar
          </button>
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
import ModalHorarios from "~/components/ModalHorarios";

export default {
  data() {
    return {
      form: {
        id_trayecto: "",
        id_bus: "",
        id_pasajero: "",
        num_asiento: ""
      }
    };
  },
  watch: {
    "form.id_trayecto": function() {
      this.form.id_bus = "";
    }
  },
  async fetch({ store }) {
    try {
      await store.dispatch("trayectos/get");
      await store.dispatch("asientos/get");
      await store.dispatch("pasajeros/get");
      await store.dispatch("horarios/get");
      await store.dispatch("buses/get");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    updateBus(id) {
      this.form.id_bus = this.form.id_bus === id ? "" : id;
    },
    busSeatpicked(seat) {
      this.form.num_asiento = seat;
    },
    async book() {
      try {
        const { data } = await this.$axios.post("/asiento", this.form);
        await this.$store.dispatch("pasajeros/get");
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
    },
    async fetchBuses() {
      const { data: buses } = await this.$axios.post("/bus/all");
      this.buses = buses;
    },
    async fetchAsientos() {
      const { data: asientos } = await this.$axios.post("/asiento/all");
      this.asientos = asientos;
    }
  },
  components: { BusSeat, ModalHorarios, TrayectoCard, BookingBusListItem },
  computed: {
    horariosTrayecto() {
      return this.$store.state.horarios.list.filter(
        h => h.id_trayecto === this.form.id_trayecto
      );
    },
    trayectos() {
      return this.$store.state.trayectos.list;
    },
    choosedTrayecto() {
      return this.$store.state.trayectos.list.find(
        t => t.id === this.form.id_trayecto
      );
    },
    asientos() {
      return this.$store.state.asientos.list;
    },
    buses() {
      return this.$store.state.buses.list;
    },
    horarios() {
      return this.$store.state.horarios.list;
    },
    pasajeros() {
      return this.$store.state.pasajeros.list;
    },
    canSubmit() {
      return Object.keys(this.form).every(f => this.form[f] !== "");
    },
    itExistASeatForPassanger() {
      return this.$store.state.asientos.list.some(
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