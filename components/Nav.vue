<template>
  <div class="bg-indigo-800 text-blue-100 shadow-md border-b border-indigo-900">
    <div class="container mx-auto px-4">
      <div class="flex items-center py-4 h-16">
        <div class="mr-auto flex items-center">
          <svg
            class="text-indigo-100 h-8 w-8 mr-1 fill-current"
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
          <p class="text-3xl">
            bus
            <span class="font-bold -ml-1">.CO</span>
          </p>
          <!-- TODO -->
        </div>
        <!-- Links -->
        <div class="ml-2 flex items-center">
          <div class="items-center mr-2 hidden md:flex">
            <nuxt-link
              class="mx-2 tracking-wider hover:text-indigo-400"
              :class="[$nuxt.$route.name === 'choferes' ? 'font-bold' : '']"
              to="/choferes"
              >Choferes</nuxt-link
            >
            <nuxt-link
              class="mx-2 tracking-wider hover:text-indigo-400"
              :class="[$nuxt.$route.name === 'trayectos' ? 'font-bold' : '']"
              to="/trayectos"
              >Trayectos</nuxt-link
            >
            <nuxt-link
              class="mx-2 tracking-wider hover:text-indigo-400"
              :class="[$nuxt.$route.name === 'pasajeros' ? 'font-bold' : '']"
              to="/pasajeros"
              >Pasajeros</nuxt-link
            >
            <nuxt-link
              class="mx-2 tracking-wider hover:text-indigo-400"
              :class="[$nuxt.$route.name === 'buses' ? 'font-bold' : '']"
              to="/buses"
              >Buses</nuxt-link
            >
            <nuxt-link
              class="mx-2 tracking-wider hover:text-indigo-400"
              :class="[$nuxt.$route.name === 'asientos' ? 'font-bold' : '']"
              to="/asientos"
              >Asientos</nuxt-link
            >
          </div>

          <nuxt-link
            class="text-yellow-500 border-l border-dashed ml-2 pl-2 border-indigo-500 hover:text-yellow-400"
            to="/booking"
          >
            <svg
              class="h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-6 -2 24 24"
              preserveAspectRatio="xMinYMin"
            >
              <path
                d="M12 9v11H8.83a3.001 3.001 0 0 0-5.66 0H0V9h4a1 1 0 1 0 0-2H0V0h3.17a3.001 3.001 0 0 0 5.66 0H12v7H8a1 1 0 1 0 0 2h4z"
              />
            </svg>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>