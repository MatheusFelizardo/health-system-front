<template>
  <header class="py-4 flex items-center justify-between" >
      <div >
        <NuxtLink to="/" class="flex gap-2 items-center text-white hover:text-blue-100 transition-colors duration-300">
          <div class="w-10 h-10 rounded-full bg-blue-500 font-bold text-lg  grid place-items-center">
            HS
          </div>
          <span class="text-blue-950 text-lg font-semibold">Healthsys</span>
        </NuxtLink>
      </div>
      <nav >
        <div>
          <ul class="flex gap-4">
            <li v-for="link in links" :key="link.name">
              <NuxtLink
                :to="link.path"
                class="text-blue-950"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
  </header>
</template>

<script setup>
  const route = useRoute()
  const links = ref([
    { name: "Find a doctor", path: "/#find-doctor" },
    { name: "Testimonials", path: "/#testimonials" },
    { name: "About us", path: "/about" },
  ])

</script>
