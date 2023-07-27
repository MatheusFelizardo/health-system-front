<template>
  <MainLayout>
    <NuxtPage />
  </MainLayout>
</template>

<script setup>
  import MainLayout from "~/layouts/MainLayout";
  const { $userStore } = useNuxtApp()

  onMounted(async () => {
    await $userStore.start()
  })
</script>
