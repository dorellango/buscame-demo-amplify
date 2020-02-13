<template>
  <modal name="horarios" height="auto" :scrollable="true" :adaptive="true">
    <div class="p-4 text-center bg-gray-200">
      <h1 class="text-lg font-bold text-gray-700">Horarios</h1>
    </div>
    <!-- Calendario -->
    <div class="px-4 py-6">
      <v-date-picker
        v-model="datepicker"
        :attributes="schedulesCalendarTrayectos"
        is-inline
        is-expanded
      ></v-date-picker>
    </div>
    <!-- Horarios -->
    <div class="px-4 mb-4">
      <form @submit.prevent="add">
        <div class="flex items-center mb-2">
          <div
            class="flex-1 font-mono text-lg text-center text-gray-500 rounded rounded-r-none border border-r-0 h-12 px-3 flex items-center justify-between"
          >
            <div class="flex items-center justify-center">
              <p class="mr-2 border-b border-indigo-200">
                {{ parseDate(datepicker) }}
              </p>
              <input-time
                v-model="form.hora"
                classes="focus:outline-none border-b border-indigo-200 text-indigo-400 w-12 pb-0 text-center appeareance-none"
              ></input-time>
            </div>
            <div class="ml-2 flex items-center">
              <select
                v-model="form.id_bus"
                class="appearance-none bg-white text-indigo-400 block w-full focus:outline-none border-b border-indigo-200 rounded-none"
                name="id_bus"
              >
                <option value="" disabled>-- --</option>
                <option
                  v-for="bus in buses"
                  :key="bus.id"
                  :value="bus.id"
                  v-text="`${bus.patente}`"
                ></option>
              </select>
              <svg
                class="fill-current ml-2 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-4 -2 24 24"
                width="24"
                height="24"
                preserveAspectRatio="xMinYMin"
              >
                <path
                  d="M4 2a2 2 0 0 0-2 2v5l12-.037V4a2 2 0 0 0-2-2H4zm7 15H5v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2.535A3.998 3.998 0 0 1 0 13V4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v9c0 1.48-.804 2.773-2 3.465V19a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2zm-7-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM4 3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1z"
                />
              </svg>
            </div>
          </div>
          <button
            :class="form.hora !== '' ? '' : 'pointer-events-none opacity-50'"
            type="submit"
            class="h-12 w-10 focus:outline-none bg-indigo-700 text-indigo-100 rounded-r block flex items-center justify-center hover:bg-indigo-400"
          >
            <svg
              class="fill-current h-6 w-6 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
              />
            </svg>
          </button>
        </div>
      </form>
      <!-- Horarios List -->
      <transition-group name="fade" tag="div">
        <horario-list-item
          v-for="horario in horariosByDate"
          :key="horario.id"
          :horario="horario"
          :buses="buses"
          @destroy="destroy"
        ></horario-list-item>
      </transition-group>
    </div>
    <div class="p-4 bg-gray-200 flex">
      <button type="button" class="btn-default" @click="hide()">
        Cerrar
      </button>
    </div>
  </modal>
</template>

<script>
import { format, isSameDay, isEqual } from "date-fns";
import HorarioListItem from "~/components/HorarioListItem";
import InputTime from "~/components/InputTime";

export default {
  data() {
    return {
      datepicker: new Date(),
      isValidTime: false,
      form: {
        fecha: "",
        hora: "",
        id_trayecto: "",
        id_bus: ""
      }
    };
  },
  mounted() {
    this.updateFecha();
  },
  watch: {
    datepicker() {
      this.updateFecha();
    }
  },
  methods: {
    isThereAPreviuosScheduleForBus() {
      const { id_bus } = this.form;
      return this.horarios.some(h => h.id_bus === id_bus);
    },
    async add() {
      if (this.isThereAPreviuosScheduleForBus()) {
        return this.$vToastify.warning(
          "Bus ya fue asignado a un horario",
          "Ups!"
        );
      }
      try {
        await this.$axios.post("/horario", this.form);
        await this.$store.dispatch("horarios/get");
        this.$vToastify.success("Trayecto agregado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    async destroy(horario) {
      try {
        await this.$axios.delete(`/horario/${horario.id}`);
        this.$store.commit("horarios/remove", horario);
        this.$vToastify.info("Horario eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error.response.data);
      }
    },
    updateFecha() {
      this.form.fecha = this.parseDate(this.datepicker);
    },
    parseDate(date) {
      return format(new Date(date), "MM/d/Y");
    },
    hide() {
      this.$modal.hide("horarios");
    },
    async show({ id }) {
      this.form.id_trayecto = id;
      await this.$store.dispatch("horarios/get");
      await this.$store.dispatch("buses/get");
      this.$modal.show("horarios");
    }
  },
  components: { HorarioListItem, InputTime },
  computed: {
    horarios() {
      return this.$store.state.horarios.list;
    },
    buses() {
      return this.$store.state.buses.list;
    },
    horariosByDate() {
      return this.$store.state.horarios.list.filter(
        h =>
          h.id_trayecto === this.form.id_trayecto &&
          isSameDay(new Date(h.fecha), new Date(this.datepicker))
      );
    },
    schedulesCalendarTrayectos() {
      return [
        {
          key: "today",
          dot: "yellow",
          dates: this.horarios
            .filter(h => h.id_trayecto === this.form.id_trayecto)
            .map(h => new Date(h.fecha))
        }
      ];
    }
  }
};
</script>