<template>
  <div>
   <section class="mt-12 flex items-center gap-20 relative">
    <div class="absolute -top-6 -left-[6%]">
      <ThreeDots class="w-[60px]" />
    </div>
    <div class="flex-1 basis-4/12">
      <h1 class="text-5xl font-semibold mb-8">Virtual healthcare for you</h1>
      <p class="text-lg font-light mb-8">Trafalgar provides progressive, and affordable healthcare, accessible on mobile and online for everyone</p>
      <Button :url="'/#find-doctor'"> Consult today </Button>
    </div>

    <div class="flex-1 basis-5/12">
      <img src="~/assets/img/illustrations/section1.png" alt="Virtual healthcare for you">
    </div>
   </section>

   <section class="mt-12 relative">
    <div>
      <div class="flex flex-col justify-center items-center">
        <h2 class="text-3xl font-semibold text-center">Our services</h2>
        <Underline :size="46"/>
      </div>

      <p class="mt-4 text-center text-slate-500 w-10/12 m-auto mb-16">We provide to you the best choiches for you. Adjust it to your health needs and make sure your undergo treatment with our highly qualified doctors you can consult with us which type of service is suitable for your health</p>

      <div id="cards" class="grid grid-cols-3 gap-8 relative">
        <div class="absolute top-[50%] translate-y-[-50%] -right-[40px] -z-10">
          <SixDots class="w-[100px]" />
        </div>
        <div class="px-10 py-12 bg-white shadow-custom rounded-xl flex flex-col justify-between" v-for="(card, index) in cardItems" :key="card.title + index">
          <component class="basis-4/12" :is="card.icon"></component> 
          <div class="basis-7/12">
            <h3 class="text-xl font-bold text-blue-950 mb-2">{{ card.title }}</h3>
            <p class="text-slate-500 "> {{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>

   
    <div class="absolute bottom-12 -left-[10%] -z-10">
      <WaveShape class="" />
    </div>
   </section>
  </div>
</template>

<script setup>
  import ThreeDots from "~/assets/img/shapes/ThreeDots";
  import SixDots from "~/assets/img/shapes/SixDots";
  import WaveShape from "~/assets/img/shapes/WaveShape";
  import SearchIcon from "~/assets/img/icons/SearchIcon";
  import PharmacyIcon from "~/assets/img/icons/PharmacyIcon";
  import ConsultationIcon from "~/assets/img/icons/ConsultationIcon";
  import DetailsInfoIcon from "~/assets/img/icons/DetailsInfoIcon";
  import EmergencyIcon from "~/assets/img/icons/EmergencyIcon";
  import TrackingIcon from "~/assets/img/icons/TrackingIcon";
  const cardItems = [
    {
      icon:  SearchIcon ,
      title: 'Search doctor',
      description: 'Choose your doctor from thousands of specialist, general, and trusted hospitals'
    },
    {
      icon: PharmacyIcon,
      title: 'Online pharmacy',
      description: 'Buy your medicines with our mobile application with a simple delivery system'
    },
    {
      icon: ConsultationIcon,
      title: 'Consultation',
      description: 'Free consultation with our trusted doctors and get the best recomendations'
    },
    {
      icon: DetailsInfoIcon,
      title: 'Details info',
      description: 'Free consultation with our trusted doctors and get the best recomendations'
    },
    {
      icon: EmergencyIcon,
      title: 'Emergency care',
      description: 'You can get 24/7 urgent care for yourself or your children and your lovely family'
    },
    {
      icon: TrackingIcon,
      title: 'Tracking',
      description: 'Track and save your medical history and health data'
    }
  ]
</script>