<template>
  <div class="container mx-auto">
    <div
      class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8"
    >
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Pasajeros</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="pasajeros.length"
        ></p>
      </div>
      <button
        type="button"
        @click="$modal.show('pasajero-add')"
        class="btn-indigo"
      >
        Ingresar
      </button>
    </div>
    <transition-group name="fade" tag="div">
      <pasajero-card
        v-for="pasajero in pasajeros"
        :key="pasajero.id"
        :pasajero="pasajero"
        @destroy="destroy"
      ></pasajero-card>
    </transition-group>
    <!-- Add Pasajero -->
    <modal name="pasajero-add" height="auto" :scrollable="true">
      <div class="p-4 text-center bg-gray-200">
        <h1 class="text-lg font-bold text-gray-700">Ingreso Pasajero</h1>
      </div>
      <form @submit.prevent="add">
        <!-- @keydown.enter="add" -->
        <div class="px-4 py-6">
          <input-form
            v-model="form.nombre"
            class="mb-2"
            label="nombre"
            name="text"
            type="text"
            placeholder="Jhon"
            :required="true"
          ></input-form>
          <input-form
            v-model="form.apellido"
            class="mb-2"
            label="apellido"
            name="apellido"
            type="text"
            placeholder="Doe"
            :required="true"
          ></input-form>
          <input-rut
            v-model="form.rut"
            class="mb-2 font-mono"
            label="rut"
            name="rut"
            type="text"
            placeholder="11.111.111-1"
            :required="true"
          ></input-rut>
        </div>
        <div class="p-4 bg-gray-200 flex">
          <button type="submit" class="btn-indigo-o">Guardar</button>
          <button class="btn-default" @click="$modal.hide('pasajero-add')">
            Cerrar
          </button>
        </div>
      </form>
    </modal>
    <!-- Add Pasajero -->
  </div>
</template>

<script>
import PasajeroCard from "~/components/PasajeroCard";

export default {
  data() {
    return {
      form: {
        nombre: "",
        apellido: "",
        rut: ""
      }
    };
  },
  async asyncData({ $axios }) {
    const pasajeros = await $axios.$post("/pasajero/all", {
      user: "diego_orellana",
      pass: "destacameorellana"
    });

    return { pasajeros };
  },
  methods: {
    async add() {
      try {
        await this.$axios.post("/pasajero", {
          user: "diego_orellana",
          pass: "destacameorellana",
          ...this.form
        });
        this.reset();
        this.updateList();
        this.$vToastify.success("Pasajero agregado exitósamente 😄", "¡Hecho!");
        this.$modal.hide("pasajero-add");
      } catch (error) {
        console.error("Something goes wrong");
      }
    },
    reset() {
      this.form.nombre = "";
      this.form.apellido = "";
      this.form.rut = "";
    },
    async updateList() {
      const { data } = await this.$axios.post("/pasajero/all", {
        user: "diego_orellana",
        pass: "destacameorellana"
      });
      this.pasajeros = data;
    },
    async destroy({ id }) {
      // if (this.choferes.some(c => c.id === id)) {
      //   return this.$vToastify.error(
      //     "No puedes eliminar choferes con buses asignados",
      //     "Nope!"
      //   );
      // }
      try {
        await this.$axios.delete(`/pasajero/${id}`, {
          data: {
            user: "diego_orellana",
            pass: "destacameorellana"
          }
        });
        this.removePasajero(id);
        this.$vToastify.info("Pasajero eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    removePasajero(id) {
      const { pasajeros } = this;
      pasajeros.splice(
        pasajeros.findIndex(c => c.id === id),
        1
      );
    }
  },
  components: { PasajeroCard }
};
</script>

<style>
</style>