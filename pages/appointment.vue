<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>

    <template v-else>
      <section class="py-14 relative">
        <div class="absolute max-w-sm -right-16 -top-3">
          <img src="~/assets/img/illustrations/appointment.svg" alt="">
        </div>
        <div class="main-gradient min-h-[400px] rounded-2xl p-8">  
          <div class="flex flex-col text-white w-fit mb-4">
            <h3 class="text-xl font-semibold">Schedule an Appointment</h3>
            <Underline class="bg-white self-center" :size="56"/>
          </div>

          <div class="bg-white min-h-[360px] rounded-2xl p-6 flex">
            <div class="w-8/12" v-if="!filledForm">
              <UserForm @handleFilledForm="handleFilledForm" />
            </div>
            
            <div v-else class="w-8/12">
              <div class="w-10/12">
                <button class="group flex flex-col w-full text-blue-500" @click="handleSelectProvider">
                  <div class="flex w-full justify-between items-center">
                    <span class="text-black font-semibold text-sm" >
                      {{ serviceProvider ? serviceProvider : "Select the service provider"}}
                    </span>
                    <CheckIcon v-if="serviceProvider" />
                    <InputSearchIcon v-else />
                  </div>
                  <Underline class="my-1 bg-blue-500 transition-colors duration-300 group-hover:bg-blue-950" />
                </button>
              </div>

              <div class="mt-4">
                <div>
                  <ScheduleSystem :service-provider="serviceProvider" @handleFilledForm="handleFilledForm" />
                </div>
              </div>
            </div>

          </div>

          <ServiceProviderSelector 
            v-if="showServiceProviderModal" 
            :toggleModal="toggleServiceProviderModal" 
            @updateServiceProvider="updateServiceProvider"
          />
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
  import InputSearchIcon from '~/assets/img/icons/InputSearchIcon'
  import { storeToRefs } from 'pinia';
  import CheckIcon from 'assets/img/icons/CheckIcon';

  const { $userStore } = useNuxtApp()
  const { providers } = storeToRefs($userStore)
  const loading = ref(false)
  const serviceProvider = ref('')
  const showServiceProviderModal = ref(false)
  const filledForm = ref(true)
  
  watchEffect(() => {
    if(providers.value.length > 0) {
      loading.value = false
    }
  })

  const handleSelectProvider = () => {
    serviceProvider.value = ''
    toggleServiceProviderModal()
  }

  const toggleServiceProviderModal = () => {
    showServiceProviderModal.value = !showServiceProviderModal.value
  }

  const updateServiceProvider = (provider) => {
    serviceProvider.value = provider.name
  }

  const handleFilledForm = (boolean) => {
    if (!boolean) {
      serviceProvider.value = ''
    }
    
    filledForm.value = boolean
  }
  

</script>
