<template>
  <Teleport to="body">
    <div id="serviceProviderSelector" class="absolute left-0 top-0 px-6 bg-black bg-opacity-40 w-full h-full flex justify-center pointer-events-auto">
        <div  class="w-11/12 m-auto max-w-7xl h-[470px] bg-[#5A98F2] relative rounded-2xl mt-[calc(72px+3.5rem)] overflow-hidden">
          <div class="absolute top-4 -left-10">
            <WaveShape class="w-80 h-auto fill-blue-300 -z-10" />
          </div>
          <div class="absolute -bottom-8 -left-8">
            <SixDots class="w-24" />
          </div>
          <div class="absolute top-36 right-4">
            <SixDots class="w-24" />
          </div>

          <button class="absolute right-3 top-3 rounded-full shadow-md " @click="props.toggleModal()">
            <CloseIcon class="w-8 h-8 text-white hover:text-blue-200 transition-colors" />
          </button>

          <div class="flex flex-col items-center justify-center py-10 px-20 mt-5">
            <div class="w-full flex flex-col relative mb-6">
              <div class="w-full flex items-center">
                <input type="text" class="text-sm w-full h-8 rounded-xl py-4 px-6 shadow-md placeholder:text-sm" placeholder="Type the service provider name" @input="searchProvider" :class="noResults && 'border border-red-500 outline-red-500'">
                <InputSearchIcon class="absolute right-6" />
              </div>
            </div>

            <div class="w-full bg-blue-950 rounded-md max-h-80 overflow-y-scroll relative z-10">
              <div class="flex flex-col gap-[1px] shadow-md ">
                <div class="grid grid-cols-12 place-items-center gap-[1px] sticky top-0">
                  <div class="col-span-3 bg-gray-200 w-full text-center rounded-tl-md font-bold text-sm p-1 grid place-items-center">NAME</div>
                  <div class="col-span-8 bg-gray-200 w-full text-center font-bold text-sm p-1 grid place-items-center">ADDRESS</div>
                  <div class="col-span-1 bg-gray-200 w-full text-center font-bold text-sm p-1 grid place-items-center">&nbsp;</div>
                </div>

                <div v-for="(provider, index) in providersClone" :key="provider.id+index" class="group cursor-pointer grid grid-cols-12 place-items-center gap-x-[1px]" @click="handleSelectProvider(provider)">
                  <div class="group-hover:bg-blue-200 col-span-3 bg-white w-full text-center text-sm h-full grid place-items-center" :class="index === providersClone.length - 1 && 'rounded-bl-md'">{{provider.name}}</div>
                  <div class="group-hover:bg-blue-200  col-span-8 bg-white w-full text-center text-sm p-1 h-full grid place-items-center">Fake address street N {{provider.id * index}} - Call api, PLEASE</div>
                  <button class="group-hover:bg-blue-200  col-span-1 bg-white w-full text-center text-sm h-full grid place-items-center" >
                    <CheckIcon class=" group-hover:fill-blue-500" />
                  </button>
                </div>

                <div v-if="noResults">
                  <div class="col-span-12 bg-white w-full text-center text-sm h-full grid place-items-center">
                    <span class="text-red-500 font-bold p-1">No results found</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </Teleport>
</template>

<script setup>
  import CloseIcon from '~/assets/img/icons/CloseIcon'
  import { storeToRefs } from 'pinia'
  import InputSearchIcon from 'assets/img/icons/InputSearchIcon';
  import CheckIcon from 'assets/img/icons/CheckIcon';
  import SixDots from 'assets/img/shapes/SixDots';
  import WaveShape from 'assets/img/shapes/WaveShape';

  const { $userStore } = useNuxtApp()
  const { providers } = storeToRefs($userStore)
  const noResults = ref(false)

  const fakeProviders = [...providers.value]
  const providersClone = ref([...fakeProviders])



  const props = defineProps({
    toggleModal: {
      type: Function
    },
    updateServiceProvider: {
      type: Function
    }
  })
  const emits = defineEmits(['updateServiceProvider']);


  onMounted(() => {
    document.querySelector('body').classList.add('overflow-hidden')
    document.querySelector('body').classList.add('pointer-events-none')
  })

  onUnmounted(() => {
    document.querySelector('body').classList.remove('overflow-hidden')
    document.querySelector('body').classList.remove('pointer-events-none')
  })

 

  const searchProvider = (e) => {
    const filtered = fakeProviders.filter(provider => {
      return provider.name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    providersClone.value = filtered

    if (filtered.length === 0 ) {
      noResults.value = true
      return
    }
    noResults.value = false
  }

  const handleSelectProvider = (provider) => {
    emits('updateServiceProvider', provider)
    props.toggleModal()
  }
</script>

<style scoped>
   /* width */
 ::-webkit-scrollbar {
    width: 8px;

  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;

  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #97C3F9;
    border-radius: 2px;
  }

 
</style>