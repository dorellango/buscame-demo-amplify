<template>
  <div class="container mx-auto">
    <div
      class="flex items-center justify-between border-b border-dashed border-gray-300 py-4 mb-8"
    >
      <div class="flex items-center">
        <h1 class="text-2xl text-gray-800 mr-2">Choferes</h1>
        <p
          class="inline-flex items-center justify-center bg-indigo-600 rounded-full h-6 w-6 text-sm font-mono text-indigo-100"
          v-text="choferes.length"
        ></p>
      </div>
      <button @click="$modal.show('chofer-add')" class="btn-indigo">
        Ingresar
      </button>
    </div>
    <!-- Choferes -->
    <transition-group name="fade" tag="div">
      <chofer-card
        v-for="chofer in choferes"
        :key="chofer.id"
        :chofer="chofer"
        @destroy="destroy"
      ></chofer-card>
    </transition-group>
    <!-- Add Chofer -->
    <modal name="chofer-add" height="auto" :scrollable="true">
      <div class="p-4 text-center bg-gray-200">
        <h1 class="text-lg font-bold text-gray-700">Ingreso Chofer</h1>
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
          <button class="btn-default" @click="$modal.hide('chofer-add')">
            Cerrar
          </button>
        </div>
      </form>
    </modal>
    <!-- Add Chofer -->
  </div>
</template>

<script>
import ChoferCard from "~/components/ChoferCard";

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
    const buses = await $axios.$post("/bus/all", {
      user: "diego_orellana",
      pass: "destacameorellana"
    });
    const choferes = await $axios.$post("/chofer/all", {
      user: "diego_orellana",
      pass: "destacameorellana"
    });

    return { choferes, buses };
  },
  methods: {
    async updateList() {
      const { data } = await this.$axios.post("/chofer/all", {
        user: "diego_orellana",
        pass: "destacameorellana"
      });
      this.choferes = data;
    },
    async add() {
      try {
        await this.$axios.post("/chofer", {
          user: "diego_orellana",
          pass: "destacameorellana",
          ...this.form
        });
        this.reset();
        this.updateList();
        this.$vToastify.success("Chofer agregado exitósamente 😄", "¡Hecho!");
        this.$modal.hide("chofer-add");
      } catch (error) {
        console.error("Something goes wrong");
      }
    },
    reset() {
      this.form.nombre = "";
      this.form.apellido = "";
      this.form.rut = "";
    },
    async destroy({ id }) {
      if (this.choferes.some(c => c.id === id)) {
        return this.$vToastify.error(
          "No puedes eliminar choferes con buses asignados",
          "Nope!"
        );
      }
      try {
        await this.$axios.delete(`/chofer/${id}`, {
          data: {
            user: "diego_orellana",
            pass: "destacameorellana"
          }
        });
        this.removeChofer(id);
        this.$vToastify.info("Chofer eliminado exitósamente 😢", "¡Hecho!");
      } catch (error) {
        console.log(error);
      }
    },
    removeChofer(id) {
      const { choferes } = this;
      choferes.splice(
        choferes.findIndex(c => c.id === id),
        1
      );
    }
  },
  components: { ChoferCard }
};
</script>

<style>
</style>