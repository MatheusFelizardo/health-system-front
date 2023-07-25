<template>

  <div class="relative">
    <div class="absolute -top-16 right-8 -z-10">
      <FooterDots class="w-[90px]" />
    </div>

    <div class="main-gradient p-10  relative translate-x-0 overflow-hidden">
      <div class="w-11/12 m-auto text-white flex justify-between ">
        <div class="text-xs font-light">
          <div class="w-fit">
            <Logo :variant="'white  '"/>
          </div>

          <p class="max-w-[260px] mt-5">
            Healthsys provides progressive, and affordable healthcare, accessible on mobile and online <span class="whitespace-nowrap">for everyone</span>
          </p>

          <p class="mt-5">©Healthsys 2023. All rights reserved</p>
        </div>

        <div class="pr-10">
            <nav>
              <h3 class="mb-3">Company</h3>

              <ul class="flex flex-col gap-1 text-sm font-light">
                <li v-for="link in links" :key="link.name" class="flex items-center relative hover:before:block before:-left-2 before:absolute before:hidden before:rounded-full before:w-1 before:h-1 before:bg-blue-500">
                  <NuxtLink
                    :to="link.path"
                  >
                    {{ link.name }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
        </div>
      </div>

      <div class="absolute -bottom-8 -left-2">
        <FooterDots class="w-[80px]" />
      </div>

    </div>
  </div>
</template>

<script setup>
    import ThreeDots from "~/assets/img/shapes/ThreeDots";
    import SixDots from "~/assets/img/shapes/SixDots";
    import TestimonialDots from "~/assets/img/shapes/TestimonialDots";
    import FooterDots from "~/assets/img/shapes/FooterDots";

  const links = ref([
    { name: "About us", path: "/about" },
    { name: "Testimonials", path: "/#testimonials" },
    { name: "Find a doctor", path: "/#find-doctor" },
    { name: "Careers", path: "/#careers" },
  ])

</script>
