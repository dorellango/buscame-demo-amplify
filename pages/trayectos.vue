<template>
  <div class="container mx-auto">
    <div
      class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8"
    >
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Trayectos</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="trayectos.length"
        ></p>
      </div>
      <button @click="$modal.show('trayecto-add')" class="btn-indigo">
        Ingresar
      </button>
    </div>
    <!-- Trayectos -->
    <transition-group name="fade" tag="div">
      <trayecto-card
        v-for="trayecto in trayectos"
        :key="trayecto.id"
        :trayecto="trayecto"
        @destroy="destroy"
      ></trayecto-card>
    </transition-group>

    <!-- Add Chofer -->
    <modal name="trayecto-add" height="auto" :scrollable="true">
      <div class="p-4 text-center bg-gray-200">
        <h1 class="text-lg font-bold text-gray-700">Ingreso Chofer</h1>
      </div>
      <form @submit.prevent="add">
        <!-- @keydown.enter="add" -->
        <div class="px-4 py-6">
          <input-form
            v-model="form.ida"
            class="mb-2"
            label="ida"
            name="ida"
            type="date"
            placeholder="DD/MM/YYYY"
            :required="true"
          ></input-form>
          <input-form
            v-model="form.vuelta"
            class="mb-2"
            label="vuelta"
            name="vuelta"
            type="date"
            placeholder="DD/MM/YYYY"
            :required="true"
          ></input-form>
          <input-form
            v-model="form.terminal"
            class="mb-2"
            label="terminal"
            name="terminal"
            type="text"
            placeholder="Colon"
            :required="true"
          ></input-form>
        </div>
        <div class="p-4 bg-gray-200 flex">
          <button type="submit" class="btn-indigo-o">Guardar</button>
          <button class="btn-default" @click="$modal.hide('trayecto-add')">
            Cerrar
          </button>
        </div>
      </form>
    </modal>
    <!-- Add Chofer -->
  </div>
</template>

<script>
import TrayectoCard from "~/components/TrayectoCard";

export default {
  data() {
    return {
      form: {
        ida: "",
        vuelta: "",
        terminal: ""
      }
    };
  },
  async asyncData({ $axios }) {
    const trayectos = await $axios.$post("/trayecto/all", {
      user: "diego_orellana",
      pass: "destacameorellana"
    });

    return { trayectos };
  },
  methods: {
    async destroy({ id }) {
      // if (this.trayectos.some(c => c.id === id)) {
      //   return this.$vToastify.error(
      //     "No puedes eliminar choferes con buses asignados",
      //     "Nope!"
      //   );
      // }
      try {
        await this.$axios.delete(`/trayecto/${id}`, {
          data: {
            user: "diego_orellana",
            pass: "destacameorellana"
          }
        });
        this.removeTrayecto(id);
        this.$vToastify.info("Trayecto eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    async add() {
      try {
        await this.$axios.post("/trayecto", {
          user: "diego_orellana",
          pass: "destacameorellana",
          ...this.form
        });
        this.reset();
        this.updateList();
        this.$vToastify.success("Trayecto agregado exitósamente 😄", "¡Hecho!");
        this.$modal.hide("trayecto-add");
      } catch (error) {
        console.error("Something goes wrong");
      }
    },
    reset() {
      this.form.ida = "";
      this.form.vuelta = "";
      this.form.terminal = "";
    },
    async updateList() {
      const { data } = await this.$axios.post("/trayecto/all", {
        user: "diego_orellana",
        pass: "destacameorellana"
      });
      this.trayectos = data;
    },
    removeTrayecto(id) {
      const { trayectos } = this;
      trayectos.splice(
        trayectos.findIndex(c => c.id === id),
        1
      );
    }
  },
  components: { TrayectoCard }
};
</script>

<style>
</style>