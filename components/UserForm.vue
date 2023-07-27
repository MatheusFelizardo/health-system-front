<template>
  <div>
    <h3 class="font-semibold mb-4">Personal informations</h3>
    
    <form action="" @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-4">
        <div class="group flex flex-col w-full relative">
          <label 
            for="email" 
            class="mb-1 font-bold text-sm relative z-10 translate-y-5 transition-transform pointer-events-none" 
          > 
            Type your email
          </label>
          <div class="relative flex items-center">
            <input 
            @click="animateLabel"
            @keyup="handleSearchUser"
            id="email" 
            class="w-full text-sm border-b-2 border-blue-500 outline-none focus:border-blue-950" 
            type="email" 
            ref="email"
            required
            @focusout="backLabel"
          >
          <SpinIcon class="animate-spin-slow absolute right-0 w-5 h-5 fill-blue-500" v-if="searchingEmail" />
          </div>
        </div>

        <template v-if="showOtherFields">
          <div class="group flex flex-col w-full relative">
            <label 
              for="name" 
              class="mb-1 font-bold text-sm relative z-10 transition-transform pointer-events-none"
              :class="foundUser.name ? 'translate-y-0' : 'translate-y-5'"
            > 
              Name
            </label>
            <div class="relative flex items-center">
              <input 
                @click="animateLabel"
                required
                id="name" 
                class="w-full text-sm border-b-2 border-blue-500 outline-none focus:border-blue-950" 
                type="text" 
                :value="foundUser.name ? foundUser.name : ''"
                @focusout="backLabel"
              >
            </div>
          </div>

          <div class="group flex flex-col w-full relative">
            <label 
              for="phone-number" 
              class="mb-1 font-bold text-sm relative z-10 transition-transform pointer-events-none" 
              :class="foundUser.phone_number ? 'translate-y-0' : 'translate-y-5'"
            > 
              Phone number
            </label>
            <div class="relative flex items-center">
              <input 
                @click="animateLabel"
                required
                id="phone-number" 
                class="w-full text-sm border-b-2 border-blue-500 outline-none focus:border-blue-950" 
                type="text" 
                :value="foundUser.phone_number ? foundUser.phone_number : ''"
                @focusout="backLabel"
              >
            </div>
          </div>
          
          <div class="flex justify-end items-center">
            <Button type="submit" class="mt-2 group">
              <span class="">Continue</span>
              <ArrowRightIcon class="fill-white relative top-.5 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </template>
      </div>
    </form>
  </div>
</template>

<script setup>
  import SpinIcon from 'assets/img/icons/SpinIcon';
  import Button from '~/components/Button'
  import { storeToRefs } from 'pinia'
  import ArrowRightIcon from 'assets/img/icons/ArrowRightIcon';

  const { $userStore } = useNuxtApp()
  const { foundUser } = storeToRefs($userStore)

  const email = ref(null)
  const searchingEmail = ref(false)
  const counter = ref(0)
  const intervalArray = ref([])
  const showOtherFields = ref(false)

  const props = defineProps({
    handleFilledForm: {
      type: Function
    }
  })

  const emits = defineEmits(['handleFilledForm'])

  watchEffect(() => {
    if(counter.value === 1000) {
      intervalArray.value.forEach((interval) => {
        clearInterval(interval)
      })
      searchingEmail.value = true
      showOtherFields.value = false

      setTimeout(() => {
        searchUser(email.value.value)
      }, 1000)
    }
  })

  const handleSearchUser = () => {
    showOtherFields.value = false

    if (email.value.value === '') {
      resetEmailLogic()
      return
    }

    intervalArray.value.forEach((interval) => {
      clearInterval(interval)
    })
    counter.value = 0
    
    const interval = setInterval(() => {
      counter.value += 100
    }, 100)
    intervalArray.value.push(interval)
    
  }

  const resetEmailLogic = () => {
    searchingEmail.value = false
    counter.value = 0
    intervalArray.value.forEach((interval) => {
      clearInterval(interval)
    })
    handleSearchUser()
  }

  const animateLabel = (e) => {
    if (e.target.labels[0]) {
      e.target.labels[0].classList.add('translate-y-0')
      e.target.labels[0].classList.remove('translate-y-5')
      return
    }
    e.target.classList.remove('translate-y-5')
    e.target.classList.add('translate-y-0')
   
  }

  const backLabel = (e) => {
    if (e.target.value === '') {
      e.target.labels[0].classList.remove('translate-y-0')
      e.target.labels[0].classList.add('translate-y-5')
    }
  }

  const searchUser = async (email) => {
    if (email) {
      const response = await $userStore.getByEmail(email)

      searchingEmail.value = false
      showOtherFields.value = true
    }
  }

  const handleSubmit = () => {
    emits('handleFilledForm', true)
  }
</script>
