import Vue from 'vue'
import { clean, format } from "rut.js";

Vue.directive('rut', function (el, binding) {
  el.innerHTML = format(clean(binding.value));
})