<template>
  <div>
    <label class="uppercase text-xs text-gray-700 font-bold mb-1" :for="name" v-text="label"></label>
    <input
      :value="value"
      @input="parseAsRut"
      class="border-2 border-gray-200 rounded px-4 py-1 text-gray-700 block w-full focus:outline-none focus:border-indigo-600"
      :class="isValid ? 'bg-green-200 ' : 'bg-gray-200' "
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
    />
  </div>
</template>

<script>
import { validate, clean, format } from "rut.js";

export default {
  data() {
    return {
      value: "",
      isValid: false
    };
  },
  methods: {
    parseAsRut(e) {
      this.value = format(clean(e.target.value));
      this.isValid = validate(this.value);
      this.$emit("input", String(this.value).replace(/\./g, ""));
    }
  },
  props: ["label", "placeholder", "type", "name", "required"]
};
</script>

<style>
</style>