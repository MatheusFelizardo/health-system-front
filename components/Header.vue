<template>
  <header class="py-4 flex items-center justify-between" >
      <Logo />
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
  import Logo from "./Logo.vue"
  const route = useRoute()
  const links = ref([
    { name: "Find a doctor", path: "/appointment" },
    { name: "Testimonials", path: "/#testimonials" },
    { name: "About us", path: "/about" },
  ])

</script>
