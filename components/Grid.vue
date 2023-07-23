<template>
  <div style="grid-template-columns: repeat(12, 75px)" class="pointer-events-none absolute grid justify-center items-center gap-[20px] w-full h-full left-[50%] translate-x-[-50%]">
    <div v-for="(griditem, index) in grid" :key="index" class="opacity-30 border bg-green-500 max-w-[75px] h-full">
      <span >{{griditem}}</span>
    </div>
  </div>
</template>

<script setup>
  const grid = Array.from({length: 12}, (_, i) => i + 1)
</script>

<style lang="scss" scoped>

</style>