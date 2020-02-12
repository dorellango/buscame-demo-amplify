<template>
  <div>
    <label class="uppercase text-xs text-gray-700 font-bold mb-1" :for="name" v-text="label"></label>
    <input
      v-model="value"
      @input="$emit('input', value)"
      class="bg-gray-200 border-2 border-gray-200 rounded px-4 py-1 text-gray-700 block w-full focus:outline-none focus:border-indigo-600"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  props: ["label", "placeholder", "type", "name", "required"]
};
</script>