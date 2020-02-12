<template>
  <div>
    <button
      type="button"
      @click="show = !show"
      class="text-indigo-100 hover:text-indigo-400 focus:outline-none block md:hidden"
    >
      <svg
        class="h-8 w-8 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-5 -7 24 24"
        width="24"
        height="24"
        preserveAspectRatio="xMinYMin"
      >
        <path
          d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"
        />
      </svg>
    </button>
    <transition name="fade">
      <div
        v-show="show"
        class="fixed inset-0 bg-indigo-100 mt-16 flex flex-col items-center z-50"
      >
        <nuxt-link
          class="mx-2 tracking-wider text-indigo-700 hover:text-indigo-400 pt-8 pb-4"
          :class="[$nuxt.$route.name === 'choferes' ? 'font-bold' : '']"
          @click.native="show = false"
          to="/choferes"
          >Choferes</nuxt-link
        >
        <nuxt-link
          class="mx-2 tracking-wider text-indigo-700 hover:text-indigo-400 py-4"
          :class="[$nuxt.$route.name === 'trayectos' ? 'font-bold' : '']"
          @click.native="show = false"
          to="/trayectos"
          >Trayectos</nuxt-link
        >
        <nuxt-link
          class="mx-2 tracking-wider text-indigo-700 hover:text-indigo-400 py-4"
          :class="[$nuxt.$route.name === 'pasajeros' ? 'font-bold' : '']"
          @click.native="show = false"
          to="/pasajeros"
          >Pasajeros</nuxt-link
        >
        <nuxt-link
          class="mx-2 tracking-wider text-indigo-700 hover:text-indigo-400 py-4"
          :class="[$nuxt.$route.name === 'buses' ? 'font-bold' : '']"
          @click.native="show = false"
          to="/buses"
          >Buses</nuxt-link
        >
        <nuxt-link
          class="mx-2 tracking-wider text-indigo-700 hover:text-indigo-400 py-4"
          :class="[$nuxt.$route.name === 'asientos' ? 'font-bold' : '']"
          @click.native="show = false"
          to="/asientos"
          >Asientos</nuxt-link
        >
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  }
};
</script>