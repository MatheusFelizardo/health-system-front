<template>
  <NuxtLink v-if="url" :to="url" type="button" :class="baseStyles">
    <slot />
  </NuxtLink>

  <button v-else type="button" :class="baseStyles">
    <slot />
  </button>
</template>

<script setup>

  const baseStyles = computed(() => {
    return `rounded-full w-fit min-w-[160px] h-[40px] flex items-center justify-center gap-[14px] px-6 py-3 font-semibold transition-colors ${schema[props.variation]}`
  })

  const props = defineProps({
    variation: {
      type: String,
      default: "blue",
    },
    url: {
      type: String,
      default: null,
    }
  })

  const schema = {
    'blue': 'bg-blue-500 hover:bg-blue-600 text-white',
    'outline': 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  }

</script>


