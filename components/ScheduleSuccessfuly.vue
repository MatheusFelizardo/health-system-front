<template>
  <div class="w-full flex flex-col">
    <div class="flex flex-col items-center w-full">
      <div class="mb-4">
        <h3 class="text-xl">Thank you for scheduling an appointment!</h3>
      </div>
      
    </div>

    <div class="flex items-end justify-center w-full">
      <div>
        <div class="w-72">
          <ScheduleSuccessfullyImage class="w-full h-full" />
        </div>
      </div>
      <div class="w-4/12">
        <div class="px-3 pt-5 pb-6 bg-yellow-100">
          <h3 class="text-center mb-2 font-bold text-blue-950">Appointment details</h3>
          <div class="mb-2">
            <p><strong class="text-blue-950">Name:</strong> {{ foundUser.name }}</p>
            <p><strong class="text-blue-950">Email:</strong> {{ foundUser.email }}</p>
            <p><strong class="text-blue-950">Phone Number:</strong> {{ foundUser.phone_number }}</p>
  
            <p><strong class="text-blue-950">Service Provider:</strong> {{ props.data.serviceProvider.name }}</p>
            <p><strong class="text-blue-950">Date/Hour:</strong> {{ props.data.date.replaceAll('-', '/') }} at {{ props.data.hour }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import ScheduleSuccessfullyImage from 'assets/img/illustrations/ScheduleSuccessfullyImage';
  import { storeToRefs } from 'pinia';
  const { $userStore } = useNuxtApp()
  const { foundUser } = storeToRefs($userStore)

  const props = defineProps({
    data: {
      type: Object
    }
  })

</script>
