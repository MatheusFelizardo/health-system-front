<template>
  <div >
    <NuxtLink to="/" class="flex gap-2 items-center text-white hover:text-blue-100 transition-colors duration-300">
      <div 
      class="w-10 h-10 rounded-full bg-blue-500 font-bold text-lg  grid place-items-center" 
      :class="props.variant && 'bg-white text-blue-400'">
        HS
      </div>
      <span class="text-blue-950 text-lg font-semibold" :class="props.variant && 'text-white'">Healthsys</span>
    </NuxtLink>
  </div>
</template>

<script setup>
  const props = defineProps({
    variant: {
      type: String
    },
  })

 
</script>