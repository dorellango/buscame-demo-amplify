<template>
  <div class="flex items-center justify-center">
    <!-- Hour -->
    <input
      :class="[isValid ? 'text-green-500 ' : 'text-red-300', classes]"
      @input="updated"
      v-model="hour"
      name="hour"
      type="number"
      placeholder="DD"
      :required="required"
    />
    <span>:</span>
    <!-- Minute -->
    <input
      :class="[isValid ? 'text-green-500 ' : 'text-red-300', classes]"
      @input="updated"
      v-model="minute"
      name="minute"
      type="number"
      placeholder="MM"
      :required="required"
    />
    <!-- Seconds -->
    <span>:</span>
    <input
      :class="[isValid ? 'text-green-500 ' : 'text-red-300', classes]"
      @input="updated"
      v-model="seconds"
      name="seconds"
      type="number"
      placeholder="HH"
      :required="required"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      hour: "00",
      minute: "00",
      seconds: "00"
    };
  },
  props: ["required", "classes"],
  mounted() {
    this.updated();
  },
  methods: {
    updated() {
      const regex = new RegExp(
        "^(?:([01]?\\d|2[0-3]):([0-5]?\\d):)?([0-5]\\d)$",
        "g"
      );

      const dateTime = `${this.hour}:${this.minute}:${this.seconds}`;

      this.isValid = regex.test(dateTime);

      this.$emit("input", this.isValid ? dateTime : "");
    }
  }
};
</script>

<style>
</style>