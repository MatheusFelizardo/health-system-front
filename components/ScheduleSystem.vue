<template>
  <div>
    <div v-if="!serviceProvider">
      <span class="font-semibold text-red-500">Please, select a service provider to start the appointment</span>
    </div>
    <div v-else>
      <div v-if="loading">
        <SpinIcon class="w-10 h-10 text-blue-500 animate-spin-slow" />
      </div>
      <div v-else class="w-full flex items-center gap-4">
        <div class="w-8/12">
          <h3 class="text-black font-semibold mb-2">Appointment dates</h3>

          <div class="flex">
            <div class="basis-7/12 border border-blue-500 p-1 bg-blue-300 rounded-sm">
              <VueDatePicker ref="datepicker" :preview-format="checkScheduleHours" inline :class="'w-full rounded-sm'">
                <template #arrow-left>
                  <ArrowRightIcon class="rotate-180" />
                </template>
        
                <template #arrow-right>
                  <ArrowRightIcon />
                </template>
              </VueDatePicker>
            </div>
        
            <div v-if="availableHours.length > 0" 
              ref="hourSelector" 
              class="relative -z-10 opacity-0 basis-5/12 flex justify-center w-full flex-col"
            >
              <div class="bg-blue-200 p-5">
                <h3 class="text-gray-400 font-semibold text-xs text-center">1 HOUR DURATION</h3>
        
                <div class="grid grid-cols-3 gap-2 mt-2 place-items-center">
                  <div 
                  class="input-ref relative w-full group" 
                  v-for="(hours, index) in availableHours" 
                  :key="hours + index" 
                  :class="hours.available ? 'bg-white text-blue-950' : 'bg-blue-300 text-gray-400 cursor-not-allowed'"
                  >
                    <label 
                      class="w-full font-semibold text-sm rounded-sm p-2 flex justify-center items-baseline"
                    :class="hours.available ? 'cursor-pointer' : 'cursor-not-allowed'"
      
                      :for="`${hours.time.hour} ${index}`"
                    >
                    {{ hours.time.hour }}&ThinSpace;<small>{{ hours.time.period.toLocaleUpperCase() }}</small>
                    </label>
                    <input 
                      :id="`${hours.time.hour} ${index}`"
                      name="selectedHour" 
                      type="radio" 
                      :value="`${hours?.time.hour} ${hours?.time.period.toLocaleUpperCase()}`"
                      class="absolute top-0 pointer-events-none opacity-0 w-0 h-0"
                      :disabled="!hours.available"
                      @change="handleActive"
                    >
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <div v-if="showResume" class="w-4/12 self-center translate-y-4">
          <div class="px-3 pt-5 pb-6 bg-yellow-100">
            <h3 class="text-center mb-2 font-bold text-blue-950">Appointment resume</h3>
            <div class="mb-2">
              <p><strong class="text-blue-950">Name:</strong> {{ foundUser.name }}</p>
              <p><strong class="text-blue-950">Email:</strong> {{ foundUser.email }}</p>
              <p><strong class="text-blue-950">Phone Number:</strong> {{ foundUser.phone_number }}</p>

              <p><strong class="text-blue-950">Service Provider:</strong> {{ serviceProvider }}</p>
              <p><strong class="text-blue-950">Date/Hour:</strong> {{ selectedDate.replaceAll('-', '/') }} at {{ selectedHours }}</p>
            </div>

            <div>
              <Button @click="handleConfirmSchedule" class="group w-full h-[30px] rounded-none" type="button">
                <span class="">
                  {{ savingData ? 'Saving' : 'Confirm' }}
                </span>
                <ArrowRightIcon v-if="!savingData" class="fill-white relative top-.5 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                <SpinIcon v-else class="w-5 h-5 text-white animate-spin-slow" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

   <button @click="handleCancelSchedule" class="absolute bg-red-500 py-1 px-6 rounded-2xl text-white font-semibold right-12 bottom-24">Cancel</button>
  </div>
</template>

<script setup>
  import ArrowRightIcon from 'assets/img/icons/ArrowRightIcon';
  import SpinIcon from 'assets/img/icons/SpinIcon';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import gsap from 'gsap'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { storeToRefs } from 'pinia';
  const { $userStore } = useNuxtApp()
  const { schedule, foundUser } = storeToRefs($userStore)

  const selectedDate = ref(new Date())
  const datepicker = ref(null)
  const hourSelector = ref(null)
  const availableHours = ref([])
  const selectedHours = ref(null)
  const scheduleMessage = ref('')
  const loading = ref(false)
  const showResume = ref(false)
  const savingData = ref(false)
  const selectSchedule = ref(null)
  
  const props = defineProps({
    serviceProvider: {
      type: String,
      default: ''
    },
    handleFilledForm: {
      type: Function
    }
  })

  const emits = defineEmits(['handleFilledForm'])

  const { serviceProvider } = toRefs(props)

  const checkScheduleHours = async (date) => {
    const jsDate = new Date(date);
    const day = jsDate.getDate();
    const month = jsDate.getMonth() + 1;
    const year = jsDate.getFullYear();
    const formatedDate = `${day}-${month}-${year}`

    if (formatedDate === selectedDate.value) {
      return
    }

    gsap.to(hourSelector.value, {
      opacity: 0,
      duration: 0,
      zIndex: '-10',
      ease: 'power2.inOut'
    })
    

    resetValues()
    selectedDate.value = formatedDate
    const scheduleArray = [...schedule.value]
    const times = []
    scheduleArray.forEach(item => {
      const serviceDate = new Date(item.date)
      const day = serviceDate.getDate();
      const month = serviceDate.getMonth() + 1;
      const year = serviceDate.getFullYear();
      const itemDate = `${day}-${month}-${year}`


      if (item.service_provider.name === serviceProvider.value && itemDate === formatedDate ) {
        const hour = serviceDate.getHours()
        const minutes = serviceDate.getMinutes()
        const formatedTime = `${hour}:${minutes}`

        times.push({
          time: convertTo12HourFormat(formatedTime),
          available: item.reservation ? false : true,
          id: item.id
        })
        
        return item
      }
    })
  
    availableHours.value = times
    setTimeout(() => {
      gsap.to(hourSelector.value, {
        opacity: 1,
        duration: .5,
        zIndex: 10
      })
    }, 100)
    return times
  }

  const handleActive = (e) => {
    const inputs = document.querySelectorAll('.input-ref')

    inputs.forEach(input => {
      input.classList.remove('bg-blue-500')
      input.classList.remove('text-white')
      input.classList.add('bg-white')
      input.classList.add('text-blue-950')
    })

    e.target.offsetParent.classList.remove('bg-white')
    e.target.offsetParent.classList.remove('text-white')
    e.target.offsetParent.classList.add('bg-blue-500')
    e.target.offsetParent.classList.add('text-white')

    const selectedHour = e.target.value
    selectedHours.value = selectedHour

    selectSchedule.value = availableHours.value.filter(item => `${item?.time.hour} ${item?.time.period.toLocaleUpperCase()}` === selectedHour)[0]
   
    scheduleMessage.value = `Scheduling for ${selectedDate.value} at ${selectedHour} at ${serviceProvider.value}`

    showResume.value = true
  }

  const convertTo12HourFormat = (timeString) => {
    const [hour, minute] = timeString.split(':').map(Number);
    const parsedMinutes = minute.toString().padStart(2, '0')

    if (hour === 0) {
      return {
        hour: `12:${parsedMinutes}`,
        period: 'am',
      }
    } else if (hour < 12) {
      return {
        hour: `${hour}:${parsedMinutes}`,
        period: 'am',
      }
    } else if (hour === 12) {
      return {
        hour: `12:${parsedMinutes}`,
        period: 'pm',
      }
    } else {
      return {
        hour: `${(hour - 12).toString().padStart(2, '0')}:${parsedMinutes}`,
        period: 'pm',
      }
    }
  }

  const resetValues = () => {
    scheduleMessage.value = ''
    showResume.value = false

    const inputs = document.querySelectorAll('.input-ref')
    
    inputs.forEach(input => {
      input.querySelector('input').checked = false
      input.classList.remove('bg-blue-500')
      input.classList.remove('text-white')
      input.classList.add('bg-white')
      input.classList.add('text-blue-950')
    })
  }

  watchEffect(() => {
      if (serviceProvider.value) {
        selectedDate.value = new Date()
        scheduleMessage.value = ''
        showResume.value = false

        
        loading.value = true
        setTimeout(() => {
          loading.value = false
        }, 1000)
      }
    }
  )
  

  const handleCancelSchedule = () => {
    emits('handleFilledForm', false)
  }

  const handleConfirmSchedule = () => {
    const data = {
      date: selectedDate.value,
      hour: selectedHours.value,
      schedule: selectSchedule.value,
    }
    savingData.value = true
    emits('showThankYouMessage', true, data)
  }

</script>

<style lang="scss">

  .dp__outer_menu_wrap  {
    width: 100%;
    border: none;
  }
  .dp__btn.dp__button, .dp__action_row {
    display: none;
  }

  .dp__menu_inner {
    --dp-menu-padding: 0;
  }

  .dp__menu {
    --tw-border-opacity: 1;
    background: rgb(147, 197, 253, var(--tw-border-opacity));
    border: none;
    border-radius: initial;
  }

  .dp__btn {
    border-radius: initial;
    margin: 1px;
  }

  .dp__month_year_col_nav {
    background: white;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100%);
    margin: 0;

    &:hover {
      background: var(--dp-hover-color);
    }

    &:first-of-type {
      width: calc(100% - 1px);
      transform: translateX(1px);
    }

    &:last-of-type {
      width: calc(100% - 1px);
    }
  }

  .dp__month_year_wrap {
    height: 100%;
    border-radius: initial;
  }

  .dp__month_year_row {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    width: calc(100% + 2px);
    margin-left: -1px;
    margin-bottom: 1px
  }

  .dp__month_year_select {
    height: 100%;
    background: white;
    border-radius: initial;
    margin: 0;

    &:first-of-type {
      margin-left: 1px;
    }

    &:last-of-type {
      margin-right: 1px;
    }
  }

  .dp__calendar_row {
    margin: 0;
    margin-bottom: 1px;
  }

  .dp__calendar_header {
    margin: 0;
    margin-bottom: 1px;
    width: 100%;
  }

  .dp__calendar_header_item {
    background: white;
    font-weight: 600;
    height: 100%;
    margin-left: 1px;

    &:first-child {
      margin-left: 0;
    }
  }
  .dp__calendar_item {
    background: white;
    font-weight: 600;
    height: 100%;
    margin: 0;
    margin-left: 1px;
    flex: 1;
    
    &:first-child {
      margin-left: 0;
    }
  }

  .dp__active_date, .dp__cell_inner {
    width: 100%;
    border-radius: initial;
  }

  .dp__inner_nav {
    &:hover {
      background: none;
    }
  }

  .dp__cell_offset {
    background: #E0EEFF;
    margin: 0;
  }
</style>