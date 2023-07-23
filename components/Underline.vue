<template>
  <div :style="`width: ${computedSize}`" class="h-[2px] my-3 text-center bg-black rounded-lg" />
</template>

<script setup>
  const props = defineProps({
    size: {
      type: String,
    }
  })

  const computedSize = computed(()=> {
    return props.size ? `${props.size}px` : '100%'
  })

</script>
