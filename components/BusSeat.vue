<template>
  <button
    @click="$emit('chosed')"
    type="button"
    class="focus:outline-none flex items-center justify-center font-mono"
    :class="active ? 'text-green-600' : ''"
  >
    <p class="text-gray-500 mr-1" v-text="number"></p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      class="inline-block fill-current hover:text-indigo-600"
      viewBox="0 0 24 24"
    >
      <defs>
        <path id="a" d="M0 0h24v24H0V0z" />
      </defs>
      <clipPath id="b">
        <use xlink:href="#a" overflow="visible" />
      </clipPath>
      <path
        d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"
        clip-path="url(#b)"
      />
    </svg>
  </button>
</template>

<script>
export default {
  props: ["active", "number"]
};
</script>

<style>
</style>